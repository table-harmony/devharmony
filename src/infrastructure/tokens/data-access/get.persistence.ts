import "server-only";

import { db } from "@/db";
import { tokens, Token } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { TokenDto } from "../types";

function toDtoMapper(token: TokenDto) {
  return {
    id: token.id,
    email: token.email,
    token: token.token,
    type: token.type,
    expires: token.expires,
  };
}

/**
 * @throws throws an error if token was not found
 */
export async function getTokenByToken(token: string): Promise<TokenDto> {
  const foundToken = await db.query.tokens.findFirst({
    where: eq(tokens.token, token),
  });

  if (!foundToken) throw new Error("Token not found!");

  return toDtoMapper(foundToken);
}

export async function getTokenByEmail(email: string): Promise<TokenDto | undefined> {
  const foundToken = await db.query.tokens.findFirst({
    where: eq(tokens.email, email),
  });

  if (!foundToken) return undefined;

  return toDtoMapper(foundToken);
}

export async function getTokens(): Promise<TokenDto[]> {
  const tokens = await db.query.tokens.findMany();

  return tokens.map(toDtoMapper);
}
