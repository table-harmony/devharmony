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

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  try {
    if (!token) throw new Error("Missing Token!");

    const magicLinkToken = await getTokenByTokenUseCase(
      { getTokenByToken: getMagicLinkTokenByToken },
      { token }
    );

    await deleteTokenUseCase(
      { deleteToken: deleteMagicLinkToken },
      { id: magicLinkToken.id }
    );

    if (new Date(magicLinkToken.expiresAt) < new Date())
      throw new Error("Token has expired!");

    let user = await getUserByEmailUseCase(
      { getUserByEmail: getUserByEmail },
      { email: magicLinkToken.email }
    );

    if (!user) {
      user = await createUser({
        email: magicLinkToken.email,
        emailVerified: new Date(Date.now()),
      });
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    const error = e as Error;
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: `/login/magic/error?error=${error.message}`,
      },
    });
  }
}
