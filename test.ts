import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/session';
import { postLimiter } from './lib/ratelimit'; // Adjust path to your ratelimit setup from previous

const protectedRoutes = [
  '/',
  '/post/new',
  '/settings',
  '/bookmarks',
  '/user/settings'
];

const authRoutes = [
  '/login',
  '/register'
];

const publicRoutes = [
  '/about',
  '/privacy',
  '/terms',
  '/premium',
  '/search',
  '/trending',
  '/ads',
  '/robots.txt',
  '/sitemap.xml'
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const sessionId = request.cookies.get('sessionId')?.value;
  
  let isAuthenticated = false;
  let userId: string | undefined;
  if (sessionId) {
    try {
      const session = await getSession(sessionId);
      isAuthenticated = !!session;
      if (session) {
        userId = session.userId; // Assuming your session object has a userId field; adjust if it's session.user.id or similar
      }
    } catch (error) {
      console.error('Error checking session:', error);
      isAuthenticated = false;
    }
  }

  // Determine identifier for rate limiting: prefer userId for auth'd users, fallback to IP
  const identifier = userId || request.ip || 'anonymous';

  // Apply rate limit
  const rateResult = await postLimiter.limit(identifier);

  if (!rateResult.success) {
    console.warn(`Rate limited: ${identifier} on ${pathname}`);
    const blockedUrl = new URL('/blocked?reason=rate-limit', request.url);
    const response = NextResponse.redirect(blockedUrl);
    if (rateResult.pending) {
      response.waitUntil(rateResult.pending);
    }
    response.headers.set('Retry-After', Math.floor((rateResult.reset - Date.now()) / 1000).toString());
    response.headers.set('X-RateLimit-Limit', rateResult.limit.toString());
    response.headers.set('X-RateLimit-Remaining', rateResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateResult.reset.toString());
    return response;
  }

  // Proceed with auth logic
  const isHomePage = pathname === '/';
  
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route === '/') {
      return isHomePage;
    }
    return pathname.startsWith(route);
  });

  // Check if current path matches any auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if current path matches any public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // Helper to add rate limit headers and waitUntil to any response
  const addRateHeadersAndWait = (res: NextResponse): NextResponse => {
    res.headers.set('X-RateLimit-Limit', rateResult.limit.toString());
    res.headers.set('X-RateLimit-Remaining', rateResult.remaining.toString());
    res.headers.set('X-RateLimit-Reset', rateResult.reset.toString());
    if (rateResult.pending) {
      res.waitUntil(rateResult.pending);
    }
    return res;
  };

  // Handle protected routes - redirect to login if not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return addRateHeadersAndWait(NextResponse.redirect(loginUrl));
  }

  // Handle auth routes - redirect to home if already authenticated
  if (isAuthRoute && isAuthenticated) {
    return addRateHeadersAndWait(NextResponse.redirect(new URL('/', request.url)));
  }

  // Allow access to public routes and dynamic routes
  if (isPublicRoute || pathname.startsWith('/user/') || pathname.startsWith('/post/')) {
    return addRateHeadersAndWait(NextResponse.next());
  }

  // For any other routes, allow access
  return addRateHeadersAndWait(NextResponse.next());
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
