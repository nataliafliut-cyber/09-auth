export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';
import { parseSetCookie } from '@/app/utils/parseSetCookie';
import { logErrorResponse } from '@/app/utils/logErrorResponse';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await api.post('/auth/register', body);
    
    const cookieStore = await cookies();
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

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    logErrorResponse(error);
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status || error.response?.status || 500 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}