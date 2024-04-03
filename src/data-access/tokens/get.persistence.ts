import "server-only";

import { db } from "@/db";
import {
  twoFactorTokens,
  verificationTokens,
  passwordResetTokens,
  TwoFactorToken,
  VerificationToken,
  PasswordResetToken,
} from "@/db/schema";
import { eq } from "drizzle-orm";

import type { TokenDto } from "@/use-cases/tokens/types";

export function toTokenDtoMapper(
  token: TwoFactorToken | VerificationToken | PasswordResetToken
) {
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
export async function getVerificationTokenByToken(
  token: string
): Promise<TokenDto> {
  const foundToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  if (!foundToken) throw new Error("Verification Token not found!");

  return toTokenDtoMapper(foundToken);
}

export async function getVerificationTokenByEmail(
  email: string
): Promise<TokenDto | undefined> {
  const foundToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.email, email),
  });

  if (!foundToken) return undefined;

  return toTokenDtoMapper(foundToken);
}

export async function getVerificationTokens(): Promise<TokenDto[]> {
  const verificationTokens = await db.query.verificationTokens.findMany();

  return verificationTokens.map(toTokenDtoMapper);
}

export async function getTwoFactorTokenByEmail(
  email: string
): Promise<TokenDto | undefined> {
  const foundToken = await db.query.twoFactorTokens.findFirst({
    where: eq(twoFactorTokens.email, email),
  });

  if (!foundToken) return undefined;

  return toTokenDtoMapper(foundToken);
}

export async function getTwoFactorTokens(): Promise<TokenDto[]> {
  const twoFactorTokens = await db.query.twoFactorTokens.findMany();

  return twoFactorTokens.map(toTokenDtoMapper);
}

/**
 * @throws throws an error if token was not found
 */
export async function getPasswordResetTokenByToken(
  token: string
): Promise<TokenDto> {
  const foundToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.token, token),
  });

  if (!foundToken) throw new Error("Password Reset Token not found!");

  return toTokenDtoMapper(foundToken);
}

export async function getPasswordResetTokenByEmail(
  email: string
): Promise<TokenDto | undefined> {
  const foundToken = await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.email, email),
  });

  if (!foundToken) return undefined;

  return toTokenDtoMapper(foundToken);
}

export async function getPasswordResetTokens(): Promise<TokenDto[]> {
  const passwordResetTokens = await db.query.passwordResetTokens.findMany();

  return passwordResetTokens.map(toTokenDtoMapper);
}
