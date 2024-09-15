import { DEFAULT_LOCALE } from '@/const';
import { middleware } from '@/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/server', () => ({
  NextRequest: vi.fn(),
  NextResponse: {
    redirect: vi.fn(),
    next: vi.fn(),
  },
}));

describe('middleware', () => {
  const mockRequest = (path: string, session: string | undefined = undefined) => {
    const url = new URL(`http://localhost${path}`);
    return {
      nextUrl: url,
      cookies: {
        get: vi.fn().mockReturnValue(session),
      },
    } as unknown as NextRequest;
  };

  it('redirects to default locale if path is root "/"', () => {
    const request = mockRequest('/');
    const response = middleware(request);

    expect(request.nextUrl.pathname).toBe(`/${DEFAULT_LOCALE}`);
    expect(response).toBe(NextResponse.redirect(request.nextUrl));
  });

  it('redirects to main page if route is protected and no session exists', () => {
    const request = mockRequest('/protected-route', undefined);
    const response = middleware(request);

    const mainUrl = new URL(`/${DEFAULT_LOCALE}`, request.nextUrl.origin);

    expect(response).toBe(NextResponse.redirect(mainUrl));
  });

  it('allows access if route is protected and session exists', () => {
    const request = mockRequest('/protected-route', 'valid_session');
    const response = middleware(request);

    expect(response).toBe(NextResponse.next());
  });

  it('redirects to main page if route is public and session exists', () => {
    const request = mockRequest('/public-route', 'valid_session');
    const response = middleware(request);

    const mainUrl = new URL(`/${DEFAULT_LOCALE}`, request.nextUrl.origin);

    expect(response).toBe(NextResponse.redirect(mainUrl));
  });

  it('allows access if route is public and no session exists', () => {
    const request = mockRequest('/public-route', undefined);
    const response = middleware(request);

    expect(response).toBe(NextResponse.next());
  });
});
