import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Diese Routen erfordern keine Authentifizierung
const publicRoutes = ['/', '/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Wenn der Benutzer versucht, eine geschützte Route zu erreichen
  if (!publicRoutes.includes(pathname)) {
    if (!token) {
      // Wenn kein Token vorhanden ist, zum Login weiterleiten
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Wenn der Benutzer versucht, auf Login/Register zuzugreifen, während er bereits eingeloggt ist
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Konfiguriere, auf welchen Pfaden die Middleware ausgeführt werden soll
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 