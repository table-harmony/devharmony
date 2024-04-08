import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
