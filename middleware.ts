import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // We use 'jose' because standard 'jsonwebtoken' doesn't work in Next.js Middleware Edge Runtime

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  // 1. Grab the ID card (token) from the user's pocket (cookies)
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  // 2. If they are trying to go to a dashboard but have NO token, send them to login
  if (pathname.startsWith('/') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    if (token) {
      // 3. Perform the 'Math Test' to see if the ID card is real
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const userRole = payload.role as string;

      // 4. Role-Based Access Control (The actual "Locking of Doors")
      // If a student tries to enter /dashboard/admin, kick them out!

      if (pathname.startsWith('/admin') && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/student', request.url));
      }
      
      
      if (pathname.startsWith('/faculty') && userRole !== 'faculty') {
        return NextResponse.redirect(new URL('/student', request.url));
      }
    }
  } catch (error) {
    // If the token is fake or expired, send them back to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// This tells Next.js: "Only run this guard on dashboard routes"
export const config = {
  matcher: ['/admin/:path*','/faculty/:path*', '/student/:path*'],// studnet is optional here add the paths which need login protection
};