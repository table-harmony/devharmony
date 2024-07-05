import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //TODO: get user with getSession - problem: cache doesn't work in middleware
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/account-settings", "/dashboard"],
};
