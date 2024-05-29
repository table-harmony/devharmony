import "server-only";

import { db } from "@/db";
import { MagicLinkToken, magicLinkTokens } from "@/db/schema";
import { eq, lt } from "drizzle-orm";

import type { CreateTokenDto, TokenDto } from "../types";

function toDtoMapper(token: MagicLinkToken): TokenDto {
  return {
    id: token.id,
    email: token.email,
    token: token.token,
    expiresAt: token.expiresAt,
  };
}

export async function createMagicLinkToken(
  data: CreateTokenDto
): Promise<TokenDto> {
  const [token] = await db
    .insert(magicLinkTokens)
    .values({
      email: data.email,
      token: data.token,
      expiresAt: data.expiresAt,
    })
    .returning();

  return toDtoMapper(token);
}

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

export async function getMagicLinkTokens(): Promise<TokenDto[]> {
  const tokens = await db.query.magicLinkTokens.findMany();

  return tokens.map(toDtoMapper);
}

export async function deleteMagicLinkToken(id: string): Promise<void> {
  await db.delete(magicLinkTokens).where(eq(magicLinkTokens.id, id));
}

export async function deleteMagicLinkTokenByEmail(
  email: string
): Promise<void> {
  await db.delete(magicLinkTokens).where(eq(magicLinkTokens.email, email));
}

export async function deleteExpiredMagicLinkTokens(): Promise<void> {
  await db
    .delete(magicLinkTokens)
    .where(lt(magicLinkTokens.expiresAt, new Date()));
}
