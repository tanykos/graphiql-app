import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, METHODS } from './const';
import getLocale from './utils/get-locale';
import { PROTECTED_ROUTES, PUBLIC_ROUTES, RouteAccessTypes, Routes } from './constants/routes';

function getRouteAccessType(normalizedPath: Routes | string): RouteAccessTypes | null {
  if (
    Object.values(PROTECTED_ROUTES).includes(normalizedPath) ||
    METHODS.includes(normalizedPath as (typeof METHODS)[number])
  ) {
    return RouteAccessTypes.PROTECTED;
  }

  if (PUBLIC_ROUTES.includes(normalizedPath as Routes)) {
    return RouteAccessTypes.PUBLIC;
  }

  return null;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = request.cookies.get('session');

  const segments = path.split('/').filter(Boolean);
  const locale = getLocale(path);
  const mainUrl = new URL(`/${locale}`, request.nextUrl.origin);
  const route = segments[1];

  const routeType = getRouteAccessType(route);

  if (path === '/') {
    request.nextUrl.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(request.nextUrl);
  }

  if (routeType === RouteAccessTypes.PROTECTED && !session) {
    return NextResponse.redirect(mainUrl);
  }

  if (routeType === RouteAccessTypes.PUBLIC && session) {
    return NextResponse.redirect(mainUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
