import { cookies } from "next/headers";

import {
  deleteTokenUseCase,
  deleteVerificationToken,
  getTokenByTokenUseCase,
  getVerificationTokenByToken,
} from "@/infrastructure/tokens";
import {
  updateUser,
  verifyEmailUseCase,
  getUserByEmail,
  getUserByEmailUseCase,
} from "@/infrastructure/users";

import { lucia } from "@/lib/auth";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token)
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/auth/new-verification/error?error=Missing Token",
      },
    });

  try {
    const verificationToken = await getTokenByTokenUseCase(
      { getTokenByToken: getVerificationTokenByToken },
      { token }
    );

    await deleteTokenUseCase(
      { deleteToken: deleteVerificationToken },
      { id: verificationToken.id }
    );

    if (new Date(verificationToken.expiresAt) < new Date())
      throw new Error("Token has expired!");

    const user = await getUserByEmailUseCase(
      { getUserByEmail: getUserByEmail },
      { email: verificationToken.email }
    );

    if (!user) throw new Error("User was not created!");

    await verifyEmailUseCase({ updateUser: updateUser }, { id: user.id });

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
    const error = e as Error;
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/auth/new-verification/error?error=${error.message}`,
      },
    });
  }
}
