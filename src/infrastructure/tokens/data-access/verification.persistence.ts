import "server-only";

import { db } from "@/db";
import { VerificationToken, verificationTokens } from "@/db/schema";
import { eq, lt } from "drizzle-orm";

import type { CreateTokenDto, TokenDto } from "../types";

function toDtoMapper(token: VerificationToken): TokenDto {
  return {
    id: token.id,
    email: token.email,
    token: token.token,
    expiresAt: token.expiresAt,
  };
}

export async function createVerificationToken(
  data: CreateTokenDto
): Promise<TokenDto> {
  const [token] = await db
    .insert(verificationTokens)
    .values({
      email: data.email,
      token: data.token,
      expiresAt: data.expiresAt,
    })
    .returning();

  return toDtoMapper(token);
}

export async function getVerificationTokenByToken(
  token: string
): Promise<TokenDto> {
  const foundToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  if (!foundToken) throw new Error("Token not found!");

  return toDtoMapper(foundToken);
}

export async function getVerificationTokens(): Promise<TokenDto[]> {
  const tokens = await db.query.verificationTokens.findMany();

  return tokens.map(toDtoMapper);
}

export async function deleteVerificationToken(id: string): Promise<void> {
  await db.delete(verificationTokens).where(eq(verificationTokens.id, id));
}

export async function deleteVerificationTokenByEmail(
  email: string
): Promise<void> {
  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.email, email));
}

export async function deleteExpiredVerificationTokens(): Promise<void> {
  await db
    .delete(verificationTokens)
    .where(lt(verificationTokens.expiresAt, new Date()));
}
