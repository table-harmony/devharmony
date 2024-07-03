import { cookies } from "next/headers";

import { generateCodeVerifier, generateState } from "arctic";
import { google } from "@/lib/auth";

export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  cookies().set("google_oauth_state", state, {
    path: "/",
    secure: true,
    httpOnly: true,
    maxAge: 60 * 10,
  });

  cookies().set("google_code_verifier", codeVerifier, {
    path: "/",
    secure: true,
    httpOnly: true,
    maxAge: 60 * 10,
  });

  return Response.redirect(url);
}
