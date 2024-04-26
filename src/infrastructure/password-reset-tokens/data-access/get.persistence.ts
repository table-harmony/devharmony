import "server-only";

import { db } from "@/db";
import { passwordResetTokens, PasswordResetToken } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { PasswordResetTokenDto } from "../types";

function toDtoMapper(token: PasswordResetToken) {
  return {
    id: token.id,
    email: token.email,
    token: token.token,
    expires: token.expires,
  };
}

/**
 * @throws throws an error if token was not found
 */
export async function getPasswordResetTokenByToken(
  token: string
): Promise<PasswordResetTokenDto> {
  const foundToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.token, token),
  });

  if (!foundToken) throw new Error("Password reset token not found!");

  return toDtoMapper(foundToken);
}

export async function getPasswordResetTokenByEmail(
  email: string
): Promise<PasswordResetTokenDto | undefined> {
  const foundToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.email, email),
  });

  if (!foundToken) return undefined;

  return toDtoMapper(foundToken);
}

export async function getPasswordResetTokens(): Promise<
  PasswordResetTokenDto[]
> {
  const tokens = await db.query.passwordResetTokens.findMany();

  return tokens.map(toDtoMapper);
}
