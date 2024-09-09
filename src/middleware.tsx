import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE } from './const';

const locales = ['en', 'ru'];
const protectedRoutes = ['/history', '/restful', '/graphiql'];
const publicRoutes = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = request.cookies.get('session');

  const segments = path.split('/').filter(Boolean);
  const locale = locales.includes(segments[0]) ? segments[0] : DEFAULT_LOCALE;
  const mainUrl = new URL(`/${locale}`, request.nextUrl.origin);
  const normalizedPath = `/${segments.slice(1).join('/')}`;

  const isProtectedRoute = protectedRoutes.includes(normalizedPath);
  const isPublicRoute = publicRoutes.includes(normalizedPath);

  if (path === '/') {
    request.nextUrl.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(request.nextUrl);
  }

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(mainUrl);
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(mainUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
