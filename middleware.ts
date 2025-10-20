import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/session';
import { isServerDown } from './lib/network';

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

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const sessionId = request.cookies.get('sessionId')?.value;

    let isAuthenticated = false;
    if (sessionId) {
        try {
            const session = await getSession(sessionId);
            isAuthenticated = !!session;
        } catch (error) {
            console.error('Error checking session:', error);
            isAuthenticated = false;
        }
    }

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

    // Handle protected routes - redirect to login if not authenticated
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Handle auth routes - redirect to home if already authenticated
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow access to public routes and dynamic routes
    if (isPublicRoute || pathname.startsWith('/user/') || pathname.startsWith('/post/')) {
        return NextResponse.next();
    }

    // For any other routes, allow access
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
