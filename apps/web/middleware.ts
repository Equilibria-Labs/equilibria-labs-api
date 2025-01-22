import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function middleware(request: NextRequest) {
  try {
    // Create a response object that we can modify
    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createClient();
    await supabase.auth.getSession();

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
