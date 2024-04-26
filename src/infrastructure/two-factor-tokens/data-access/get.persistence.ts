import "server-only";

import { db } from "@/db";
import { twoFactorTokens, TwoFactorToken } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { TwoFactorTokenDto } from "../types";

function toDtoMapper(token: TwoFactorToken) {
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
export async function getTwoFactorTokenByToken(
  token: string
): Promise<TwoFactorTokenDto> {
  const foundToken = await db.query.twoFactorTokens.findFirst({
    where: eq(twoFactorTokens.token, token),
  });

  if (!foundToken) throw new Error("Two factor token not found!");

  return toDtoMapper(foundToken);
}

export async function getTwoFactorTokenByEmail(
  email: string
): Promise<TwoFactorTokenDto | undefined> {
  const foundToken = await db.query.twoFactorTokens.findFirst({
    where: eq(twoFactorTokens.email, email),
  });

  if (!foundToken) return undefined;

  return toDtoMapper(foundToken);
}

export async function getTwoFactorTokens(): Promise<TwoFactorTokenDto[]> {
  const tokens = await db.query.twoFactorTokens.findMany();

  return tokens.map(toDtoMapper);
}
