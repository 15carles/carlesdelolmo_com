import { NextRequest, NextResponse } from 'next/server';

const NOINDEX_HEADER_VALUE = 'noindex, nofollow, noarchive, nosnippet, noimageindex';
const PROTECTED_PATH_PREFIXES = ['/keystatic', '/api/keystatic'] as const;

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function withNoIndex(response: NextResponse): NextResponse {
  response.headers.set('X-Robots-Tag', NOINDEX_HEADER_VALUE);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

function parseBasicAuthHeader(
  authorizationHeader: string | null
): { username: string; password: string } | null {
  if (!authorizationHeader) return null;

  const [scheme, encodedValue] = authorizationHeader.split(' ');
  if (scheme !== 'Basic' || !encodedValue) return null;

  let decodedValue: string;
  try {
    decodedValue = atob(encodedValue);
  } catch {
    return null;
  }

  const separatorIndex = decodedValue.indexOf(':');
  if (separatorIndex < 0) return null;

  return {
    username: decodedValue.slice(0, separatorIndex),
    password: decodedValue.slice(separatorIndex + 1),
  };
}

function isAuthorized(
  request: NextRequest,
  expectedUsername: string,
  expectedPassword: string
): boolean {
  const credentials = parseBasicAuthHeader(request.headers.get('authorization'));
  if (!credentials) return false;

  return (
    credentials.username === expectedUsername &&
    credentials.password === expectedPassword
  );
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const expectedUsername = process.env.KEYSTATIC_BASIC_AUTH_USER;
  const expectedPassword = process.env.KEYSTATIC_BASIC_AUTH_PASS;
  const isProduction = process.env.NODE_ENV === 'production';

  if (!expectedUsername || !expectedPassword) {
    if (isProduction) {
      return withNoIndex(
        new NextResponse(
          'Keystatic locked. Configure KEYSTATIC_BASIC_AUTH_USER and KEYSTATIC_BASIC_AUTH_PASS.',
          { status: 503 }
        )
      );
    }

    return withNoIndex(NextResponse.next());
  }

  if (!isAuthorized(request, expectedUsername, expectedPassword)) {
    const unauthorizedResponse = new NextResponse('Authentication required', {
      status: 401,
    });
    unauthorizedResponse.headers.set(
      'WWW-Authenticate',
      'Basic realm="Keystatic", charset="UTF-8"'
    );
    return withNoIndex(unauthorizedResponse);
  }

  return withNoIndex(NextResponse.next());
}

export const config = {
  matcher: ['/keystatic/:path*', '/api/keystatic/:path*'],
};

