import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.headers.get('cookie') || '';

  let isAuthenticated = false;

  try {
    const res = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
      headers: { cookie },
    });
    if (res.ok) {
      const data = await res.json();
      isAuthenticated = !!data;
    }
  } catch {
    isAuthenticated = false;
  }

  const isPrivateKey = privateRoutes.some((route) => pathname.startsWith(route));
  const isPublicKey = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPrivateKey && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublicKey && isAuthenticated) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};