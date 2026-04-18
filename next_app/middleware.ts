import { NextRequest, NextResponse } from 'next/server';

const NOINDEX_HEADER_VALUE = 'noindex, nofollow, noarchive, nosnippet, noimageindex';
const PROTECTED_PATH_PREFIXES = ['/keystatic', '/api/keystatic'] as const;

function parseCanonicalHost(rawValue: string | undefined): string | null {
  if (!rawValue) return null;

  const normalizedValue = rawValue.trim();
  if (!normalizedValue) return null;

  try {
    const valueWithProtocol = /^https?:\/\//.test(normalizedValue)
      ? normalizedValue
      : `https://${normalizedValue}`;
    return new URL(valueWithProtocol).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function getRequestHost(request: NextRequest): string {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const hostHeader = request.headers.get('host');
  const rawHost = forwardedHost ?? hostHeader ?? request.nextUrl.host;

  return rawHost.split(':')[0].toLowerCase();
}

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

/**
 * Constant-time string comparison. Avoids leaking the position of the first
 * mismatched byte via response-time differences (Web Crypto API does not
 * expose timingSafeEqual in the Edge runtime, so we implement it manually).
 *
 * Note: the length difference itself is still observable; we mix it into the
 * accumulator so callers cannot short-circuit on length alone.
 */
function timingSafeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);

  const maxLen = Math.max(aBytes.length, bBytes.length);
  let mismatch = aBytes.length === bBytes.length ? 0 : 1;

  for (let i = 0; i < maxLen; i++) {
    mismatch |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }

  return mismatch === 0;
}

function isAuthorized(
  request: NextRequest,
  expectedUsername: string,
  expectedPassword: string
): boolean {
  const credentials = parseBasicAuthHeader(request.headers.get('authorization'));
  if (!credentials) return false;

  // Always evaluate both comparisons (no short-circuit) to avoid leaking
  // which field (user vs pass) failed via timing.
  const userMatch = timingSafeEqual(credentials.username, expectedUsername);
  const passMatch = timingSafeEqual(credentials.password, expectedPassword);
  return userMatch && passMatch;
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const canonicalHost = parseCanonicalHost(process.env.KEYSTATIC_CANONICAL_HOST);

  if (isProduction && canonicalHost && getRequestHost(request) !== canonicalHost) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = 'https:';
    canonicalUrl.hostname = canonicalHost;
    canonicalUrl.port = '';

    return withNoIndex(NextResponse.redirect(canonicalUrl, 308));
  }

  const expectedUsername = process.env.KEYSTATIC_BASIC_AUTH_USER;
  const expectedPassword = process.env.KEYSTATIC_BASIC_AUTH_PASS;

  // Fail closed in EVERY environment (production, preview, development).
  // Previously this only returned 503 in production, which left preview
  // deployments and any non-production runtime wide open to /keystatic and
  // /api/keystatic if the env vars happened to be missing.
  if (!expectedUsername || !expectedPassword) {
    return withNoIndex(
      new NextResponse(
        'Keystatic locked. Configure KEYSTATIC_BASIC_AUTH_USER and KEYSTATIC_BASIC_AUTH_PASS.',
        { status: 503 }
      )
    );
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
