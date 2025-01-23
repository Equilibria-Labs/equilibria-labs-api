import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.error('Missing required environment variables');
      return NextResponse.redirect(new URL('/error', request.url));
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            response.cookies.set(name, value, options);
          },
        },
      }
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // Protected routes require authentication
    if (request.nextUrl.pathname.startsWith('/protected')) {
      if (error || !user) {
        console.error('Protected route access denied:', error);
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    }

    // Redirect authenticated users from home to protected area
    if (request.nextUrl.pathname === '/' && user) {
      return NextResponse.redirect(new URL('/protected', request.url));
    }

    return response;
  } catch (e) {
    console.error('Middleware critical error:', e);
    // Redirect to an error page instead of silently continuing
    return NextResponse.redirect(new URL('/error', request.url));
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/', '/protected/:path*'],
};
