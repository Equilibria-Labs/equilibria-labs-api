import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create a response function
const getResponse = async (request: NextRequest) => {
  console.log(
    '🟨 Middleware: Processing request for path:',
    request.nextUrl.pathname
  );

  // Create a new response
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    // Log cookies for debugging
    const allCookies = request.cookies.getAll();
    console.log(
      '🟨 Middleware: All cookies:',
      allCookies.map(c => ({
        name: c.name,
        value: c.value,
      }))
    );

    const cookieName = `sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('.')[0].split('//')[1]}-auth-token`;
    console.log('🟨 Middleware: Looking for cookie:', cookieName);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            const cookie = request.cookies.get(name);
            console.log(
              '🟨 Middleware: Getting cookie:',
              name,
              cookie?.value ? '(present)' : '(missing)'
            );
            return cookie?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            console.log('🟨 Middleware: Setting cookie:', name);
            response.cookies.set({
              name,
              value,
              path: '/',
              ...options,
              sameSite: 'lax',
              httpOnly: true,
              // Allow cookies in HTTP for local development
              secure: false,
            });
          },
          remove(name: string, options: CookieOptions) {
            console.log('🟨 Middleware: Removing cookie:', name);
            response.cookies.delete({
              name,
              path: '/',
              ...options,
            });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(
      '🟨 Middleware: User status:',
      user ? 'Authenticated' : 'Not authenticated'
    );

    // Handle protected routes
    if (request.nextUrl.pathname.startsWith('/protected') && !user) {
      console.log(
        '🟨 Middleware: Redirecting unauthenticated user from protected route to /sign-in'
      );
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Redirect authenticated users from home
    if (request.nextUrl.pathname === '/' && user) {
      console.log(
        '🟨 Middleware: Redirecting authenticated user from home to /protected'
      );
      return NextResponse.redirect(new URL('/protected', request.url));
    }

    return response;
  } catch (e) {
    console.error('🔴 Middleware error:', e);
    return response;
  }
};

// Export the middleware function
export async function middleware(request: NextRequest) {
  return getResponse(request);
}

// Keep the matcher configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
