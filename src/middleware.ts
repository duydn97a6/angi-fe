import { NextResponse, type NextRequest } from 'next/server';

const protectedRoutes = ['/home', '/history', '/profile', '/groups', '/restaurants', '/onboarding'];
const authRoutes = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = normalizeToken(request.cookies.get('accessToken')?.value);
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return clearInvalidAuthCookies(NextResponse.redirect(loginUrl));
  }

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  const response = NextResponse.next();
  if (!accessToken && request.cookies.has('accessToken')) {
    return clearInvalidAuthCookies(response);
  }

  return response;
}

function normalizeToken(token?: string) {
  return token && token.trim().length > 0 && token !== 'undefined' && token !== 'null' ? token : null;
}

function clearInvalidAuthCookies(response: NextResponse) {
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
