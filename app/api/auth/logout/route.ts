import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {},
      { headers: { Cookie: cookieHeader } }
    );

    const res = NextResponse.json({ message: 'Logged out successfully' });
    
    // Czyszczenie ciasteczek sesyjnych po stronie klienta
    const allCookies = cookieStore.getAll();
    allCookies.forEach((c) => {
      res.cookies.set(c.name, '', { expires: new Date(0), path: '/' });
    });

    return res;
  } catch (error: any) {
    const res = NextResponse.json({ message: 'Logout completed' });
    const cookieStore = await cookies();
    cookieStore.getAll().forEach((c) => {
      res.cookies.set(c.name, '', { expires: new Date(0), path: '/' });
    });
    return res;
  }
}