import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    if (!cookieHeader) {
      return NextResponse.json(null, { status: 401 });
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      { headers: { Cookie: cookieHeader } }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(null, { status: 401 });
  }
}