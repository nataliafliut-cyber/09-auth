import { NextResponse, NextRequest } from 'next/server';
import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await api.post('/auth/register', body);
    
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
        { message: error.response?.data?.message || 'Registration failed' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}