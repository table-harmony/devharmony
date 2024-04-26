import "server-only";

import { db } from "@/db";
import { verificationTokens, VerificationToken } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { VerificationTokenDto } from "../types";

function toDtoMapper(token: VerificationToken) {
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
): Promise<VerificationTokenDto> {
  const foundToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  if (!foundToken) throw new Error("Verification token not found!");

  return toDtoMapper(foundToken);
}

export async function getVerificationTokenByEmail(
  email: string
): Promise<VerificationTokenDto | undefined> {
  const foundToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.email, email),
  });

  if (!foundToken) return undefined;

  return toDtoMapper(foundToken);
}

export async function getVerificationTokens(): Promise<VerificationTokenDto[]> {
  const tokens = await db.query.verificationTokens.findMany();

  return tokens.map(toDtoMapper);
}
