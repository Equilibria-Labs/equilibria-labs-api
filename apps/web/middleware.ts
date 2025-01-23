import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'experimental-edge';

export async function middleware(request: NextRequest) {
  console.log('Middleware running on path:', request.nextUrl.pathname);

  // Return a basic response to test if middleware works
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/protected/:path*'],
};
