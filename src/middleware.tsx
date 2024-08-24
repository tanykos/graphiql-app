import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE } from './const';

export function middleware(request: NextRequest) {
  request.nextUrl.pathname = `/${DEFAULT_LOCALE}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/'],
};
