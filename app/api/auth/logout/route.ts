export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/utils/logErrorResponse';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const response = await api.post('/auth/logout', {}, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

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