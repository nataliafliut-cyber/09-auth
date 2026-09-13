import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/notes?${searchParams.toString()}`,
      { headers: { Cookie: cookieHeader } }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Błąd pobierania notatek' },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/notes`,
      body,
      { headers: { Cookie: cookieHeader } }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Błąd tworzenia notatki' },
      { status: error.response?.status || 500 }
    );
  }
}