export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';
import { parseSetCookie } from '@/app/utils/parseSetCookie';
import { logErrorResponse } from '@/app/utils/logErrorResponse';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!accessToken && !refreshToken) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const response = await api.get('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
      cookiesArray.forEach((cookieStr) => {
        const parsed = parseSetCookie(cookieStr);
        if (parsed) {
          cookieStore.set(parsed.name, parsed.value, parsed.options);
        }
      });
    }

    return NextResponse.json({ success: true, user: response.data }, { status: response.status });
  } catch (error: unknown) {
    logErrorResponse(error);
    if (isAxiosError(error)) {
      return NextResponse.json(
        { success: false, error: error.response?.data?.error || 'Unauthorized' },
        { status: error.response?.status || 401 }
      );
    }
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}