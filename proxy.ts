import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { fetchServerSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  let isAuthenticated = !!accessToken;

  if (!accessToken && refreshToken) {
    try {
      const res = await fetchServerSession();
      if (res && res.status === 200) {
        isAuthenticated = true;
        // Przekazanie nowych ciasteczek z odpowiedzi serwera jeśli istnieją
        const setCookieHeader = res.headers?.['set-cookie'];
        if (setCookieHeader) {
          const resNext = NextResponse.next();
          const cookiesArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
          cookiesArray.forEach((cookieStr) => {
            resNext.headers.append('set-cookie', cookieStr);
          });
          return resNext;
        }
      }
    } catch {
      isAuthenticated = false;
    }
  }

  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};