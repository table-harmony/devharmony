import { createGoogleUserUseCase } from "@/use-cases/users";

import { cookies } from "next/headers";

import { OAuth2RequestError } from "arctic";

import { setSession } from "@/utils/session";
import { google } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState || !codeVerifier)
    return new Response(null, { status: 400 });

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const googleUser: GoogleUser = await response.json();

    const user = await createGoogleUserUseCase({
      googleId: googleUser.sub,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
    });

    await setSession(user.id);
    return new Response(null, {
      status: 302,
      headers: {
        Location: DEFAULT_LOGIN_REDIRECT,
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError)
      return new Response(null, { status: 400 });
    return new Response(null, { status: 500 });
  }
}

interface GoogleUser {
  sub: string;
  name: string;
  picture: string;
  email: string;
}
