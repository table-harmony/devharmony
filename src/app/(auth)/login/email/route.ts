import {
  deleteMagicLinkToken,
  deleteTokenUseCase,
  getMagicLinkTokenByToken,
  getTokenByTokenUseCase,
} from "@/infrastructure/tokens";
import {
  createUser,
  getUserByEmail,
  getUserByEmailUseCase,
} from "@/infrastructure/users";

import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token)
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login/magic/error?error=missing_token",
      },
    });

  const magicLinkToken = await getTokenByTokenUseCase(
    { getTokenByToken: getMagicLinkTokenByToken },
    { token }
  );

  if (new Date(magicLinkToken.expiresAt) < new Date())
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login/magic/error?error=token_is_expired",
      },
    });

  const existingUser = await getUserByEmailUseCase(
    { getUserByEmail: getUserByEmail },
    { email: magicLinkToken.email }
  );

  if (existingUser) {
    await deleteTokenUseCase(
      { deleteToken: deleteMagicLinkToken },
      { id: magicLinkToken.id }
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

  await deleteTokenUseCase(
    { deleteToken: deleteMagicLinkToken },
    { id: magicLinkToken.id }
  );

  const user = await createUser({
    email: magicLinkToken.email,
    emailVerified: new Date(Date.now()),
  });

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
}
