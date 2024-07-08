import "server-only";

import { UserId } from "@/infrastructure/users";

import { cache } from "react";
import { cookies } from "next/headers";

import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/auth";
import { AuthenticationError } from "@/utils/errors";

export const getSession = cache(async () => {
  const session = await validateRequest();
  return session;
});

export const assertAuthenticated = async () => {
  const { user, session } = await getSession();
  if (!user || !session) {
    throw new AuthenticationError();
  }
  return { user, session };
};

export const setSession = async (userId: UserId) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const invalidateSession = async (sessionId: string) => {
  await lucia.invalidateSession(sessionId);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const invalidateUserSessions = async (userId: UserId) => {
  await lucia.invalidateUserSessions(userId);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};
