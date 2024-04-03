import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {}

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
