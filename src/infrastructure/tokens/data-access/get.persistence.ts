import "server-only";

import { db } from "@/db";
import { MagicLinkToken, magicLinkTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { TokenDto } from "../types";

export function toDtoMapper(token: MagicLinkToken): TokenDto {
  return {
    id: token.id,
    email: token.email,
    token: token.token,
    expiresAt: token.expiresAt,
  };
}

/**
 * @throws throws an error if user was not found
 */
export async function getMagicLinkToken(id: string): Promise<TokenDto> {
  const foundToken = await db.query.magicLinkTokens.findFirst({
    where: eq(magicLinkTokens.id, id),
  });

  if (!foundToken) throw new Error("Token not found!");

  return toDtoMapper(foundToken);
}

export async function getMagicLinkTokenByEmail(
  email: string
): Promise<TokenDto | undefined> {
  const foundToken = await db.query.magicLinkTokens.findFirst({
    where: eq(magicLinkTokens.email, email),
  });

  if (!foundToken) return undefined;

  return toDtoMapper(foundToken);
}

export async function getMagicLinkTokenByToken(
  token: string
): Promise<TokenDto> {
  const foundToken = await db.query.magicLinkTokens.findFirst({
    where: eq(magicLinkTokens.token, token),
  });

  if (!foundToken) throw new Error("Token not found!");

  return toDtoMapper(foundToken);
}
