import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const response = await api.post('/auth/logout', {}, {
      headers: {
        Cookie: cookieString,
      },
    });

    const nextResponse = NextResponse.json(response.data, { status: response.status });

    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      if (Array.isArray(setCookieHeader)) {
        setCookieHeader.forEach(cookie => {
          nextResponse.headers.append('set-cookie', cookie);
        });
      } else {
        nextResponse.headers.set('set-cookie', setCookieHeader);
      }
    }

    return nextResponse;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || 'Logout failed' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}