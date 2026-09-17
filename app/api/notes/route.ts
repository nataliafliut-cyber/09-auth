export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '@/lib/api/api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/utils/logErrorResponse';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const { searchParams } = new URL(request.url);
    
    const page = searchParams.get('page') || '1';
    const search = searchParams.get('search') || '';
    const tag = searchParams.get('tag') || '';

    const queryParams: Record<string, string> = { page };
    if (search) queryParams.search = search;
    if (tag && tag.toLowerCase() !== 'all') queryParams.tag = tag;

    const response = await api.get('/notes', {
      params: queryParams,
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

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