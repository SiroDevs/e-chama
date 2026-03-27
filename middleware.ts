import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/auth-actions";

const protectedRoutes = ["/contributions", "/members", "/meetings", "/settings", "/profile"];
const authRoutes = ["/signin", "/signout"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const userInfo = await getCurrentUser();

  const isProtectedRoute = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));

  if (!userInfo && isProtectedRoute) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (userInfo && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};