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

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

    // This will refresh session if expired - required for Server Components
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser().catch(e => {
      console.error('Error in getUser:', e);
      return { data: { user: null }, error: e };
    });

    // protected routes
    if (request.nextUrl.pathname.startsWith('/protected') && error) {
      console.error('Protected route access denied:', error);
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (request.nextUrl.pathname === '/' && !error) {
      return NextResponse.redirect(new URL('/protected', request.url));
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    console.error('Middleware critical error:', e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/', '/protected/:path*'],
};
