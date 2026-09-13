import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      body
    );

    const res = NextResponse.json(response.data);
    const setCookieHeader = response.headers['set-cookie'];

    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      cookiesArray.forEach((cookieStr) => {
        const [nameValue] = cookieStr.split(';');
        const [name, ...valueParts] = nameValue.split('=');
        const value = valueParts.join('=');

        if (name && value) {
          res.cookies.set(name.trim(), value.trim(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
          });
        }
      });
    }

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.message || 'Błąd logowania' },
      { status: error.response?.status || 500 }
    );
  }
}