import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const { searchParams } = new URL(request.url);
    
    const page = searchParams.get('page') || '1';
    const search = searchParams.get('search') || '';
    const tag = searchParams.get('tag') || '';
    
    const params = new URLSearchParams();
    params.append('page', page);
    if (search) params.append('search', search);
    if (tag && tag !== 'all') params.append('tag', tag);

    const response = await api.get(`/notes?${params.toString()}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { error: 'Failed to fetch notes' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();

    const response = await api.post('/notes', body, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { error: 'Failed to create note' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}