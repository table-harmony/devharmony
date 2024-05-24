import "server-only";

import { db } from "@/db";
import { User, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";

import type { UserDto } from "../types";

export function toDtoMapper(user: User): UserDto {
  return {
    id: user.id,
    accountType: user.accountType,
    username: user.username,
    email: user.email,
    emailVerified: user.emailVerified,
    googleId: user.googleId,
    githubId: user.githubId,
    password: user.password,
    salt: user.salt,
    image: user.image,
    role: user.role,
  };
}

/**
 * @throws throws an error if user was not found
 */
export async function getUser(userId: string): Promise<UserDto> {
  const foundUser = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!foundUser) throw new Error("User not found!");

  return toDtoMapper(foundUser);
}

export async function getUserByEmail(
  email: string
): Promise<UserDto | undefined> {
  const foundUser = await db.query.users.findFirst({
    where: and(eq(users.email, email), eq(users.accountType, "email")),
  });

  if (!foundUser) return undefined;

  return toDtoMapper(foundUser);
}

export async function getUsers(): Promise<UserDto[]> {
  const users = await db.query.users.findMany();

  return users.map(toDtoMapper);
}
