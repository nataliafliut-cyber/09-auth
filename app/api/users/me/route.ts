import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      { headers: { Cookie: cookieHeader } }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Nieautoryzowano' },
      { status: error.response?.status || 401 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      body,
      { headers: { Cookie: cookieHeader } }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Błąd aktualizacji profilu' },
      { status: error.response?.status || 500 }
    );
  }
}