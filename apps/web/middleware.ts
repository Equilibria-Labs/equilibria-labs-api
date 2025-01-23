import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add event listener for fetch events
const handler = async (request: NextRequest) => {
  console.log('Middleware running on path:', request.nextUrl.pathname);
  return NextResponse.next();
};

export async function middleware(request: NextRequest) {
  return handler(request);
}

export const config = {
  matcher: ['/', '/protected/:path*'],
};
