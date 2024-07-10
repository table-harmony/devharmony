import "server-only";

import { db } from "@/db";
import { users } from "@/db/schema";

import { eq } from "drizzle-orm";

import type { UserId } from "../types";

export async function getUser(userId: UserId) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
}

export async function getUserByGoogle(googleId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.googleId, googleId),
  });

  return user;
}
