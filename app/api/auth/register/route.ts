import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await api.post('/auth/register', body);
    
    const cookieStore = await cookies();
    const setCookieHeader = response.headers['set-cookie'];
    
    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
      cookiesArray.forEach((cookieStr) => {
        const [cookiePair] = cookieStr.split(';');
        const [name, value] = cookiePair.split('=');
        if (name && value) {
          cookieStore.set(name.trim(), value.trim());
        }
      });
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { error: 'Registration failed' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}