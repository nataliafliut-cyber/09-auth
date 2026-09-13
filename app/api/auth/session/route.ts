import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const response = await api.get('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { error: 'Unauthorized' },
        { status: error.response?.status || 401 }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}