import { createUser, getUser, getUserUseCase } from "@/infrastructure/users";
import {
  createAccount,
  createAccountUseCase,
  getAccount,
  getAccountUseCase,
} from "@/infrastructure/accounts";

import { googleAuth, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState || !codeVerifier)
    return new Response(null, { status: 400 });

  try {
    const tokens = await googleAuth.validateAuthorizationCode(
      code,
      codeVerifier
    );
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser: GoogleUser = await response.json();
    console.log(googleUser);
    const existingAccount = await getAccountUseCase(
      { getAccount: getAccount },
      { id: googleUser.sub }
    );

    if (existingAccount) {
      const existingUser = await getUserUseCase(
        { getUser: getUser },
        { id: existingAccount.userId }
      );

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );

      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const user = await createUser({
      email: googleUser.email,
      username: googleUser.name,
      image: googleUser.picture,
      emailVerified: new Date(Date.now()),
    });

    await createAccountUseCase(
      { createAccount: createAccount },
      { id: googleUser.sub, type: "google", userId: user.id }
    );

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
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
