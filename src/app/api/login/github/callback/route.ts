import { createUser, getUser, getUserUseCase } from "@/infrastructure/users";
import {
  createAccount,
  createAccountUseCase,
  getAccount,
  getAccountUseCase,
} from "@/infrastructure/accounts";

import { github, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState)
    return new Response(null, { status: 400 });

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await response.json();

    const existingAccount = await getAccountUseCase(
      { getAccount: getAccount },
      { id: githubUser.id }
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
      email: "lironkaner00",
      username: githubUser.login,
      image: githubUser.avatar_url,
      emailVerified: new Date(Date.now()),
    });

    await createAccountUseCase(
      { createAccount: createAccount },
      { id: githubUser.id, type: "github", userId: user.id }
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

interface GitHubUser {
  id: string;
  login: string;
  avatar_url: string;
  email: string;
}
