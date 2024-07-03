import "server-only";

import { UserId } from "@/infrastructure/users";

import { cache } from "react";
import { cookies } from "next/headers";

import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/auth";

export const getCurrentUser = cache(async () => {
  const session = await validateRequest();
  if (!session.user) {
    return undefined;
  }
  return session.user;
});

export const setSession = async (userId: UserId) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};
