import { type NextRequest, type NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  const cookies = request.cookies;
  const refreshToken = cookies.get('sb-refresh-token');
}
