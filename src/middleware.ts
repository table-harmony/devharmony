import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import {
  adminRoutes,
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/config/routes";
import { validateRequest } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  const { user } = await validateRequest();

  if (isAuthRoute || isApiAuthRoute) {
    if (user)
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.url),
      );
    return null;
  }

  if (!isPublicRoute && !user)
    return NextResponse.redirect(new URL("/login", request.url));

  if (user) {
    if (user.role !== "admin" && isAdminRoute)
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.url),
      );
  }

  return null;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
