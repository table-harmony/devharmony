import "server-only";

import { db } from "@/db";
import { User, users } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { UserDto } from "@/use-cases";

export function toUserDtoMapper(user: User): UserDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    emailVerified: user.emailVerified,
    image: user.image,
    role: user.role,
    isTwoFactorEnabled: user.isTwoFactorEnabled,
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

  return toUserDtoMapper(foundUser);
}

export async function getUserByEmail(
  email: string
): Promise<UserDto | undefined> {
  const foundUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!foundUser) return undefined;

  return toUserDtoMapper(foundUser);
}

export async function getUsers(): Promise<UserDto[]> {
  const users = await db.query.users.findMany();

  return users.map(toUserDtoMapper);
}
