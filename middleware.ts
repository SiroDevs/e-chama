import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/contributions",
  "/members",
  "/meetings",
  "/settings",
  "/profile",
];

const authRoutes = ["/signin", "/signout"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/contributions", request.url)); // or dashboard
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};