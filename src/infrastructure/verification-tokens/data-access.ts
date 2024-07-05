import "server-only";

import { db } from "@/db";
import { verificationTokens } from "@/db/schema";

import { eq, lt } from "drizzle-orm";

import { TOKEN_EXPIRATION, TOKEN_LENGTH, generateRandomToken } from "./utils";
import { Token } from "./types";

import type { UserId } from "@/infrastructure/users";

export async function createVerification(userId: UserId) {
  const token = generateRandomToken(TOKEN_LENGTH);
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION);

  const [verification] = await db
    .insert(verificationTokens)
    .values({
      userId,
      token,
      expiresAt,
    })
    .onConflictDoUpdate({
      target: verificationTokens.userId,
      set: {
        token,
        expiresAt,
      },
    })
    .returning();

  return verification;
}

export async function getVerification(token: Token) {
  const existingToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  return existingToken;
}

export async function getVerifications() {
  return await db.query.verificationTokens.findMany();
}

export async function deleteVerification(token: Token) {
  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.token, token));
}

export async function deleteVerificationById(verificationId: number) {
  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.id, verificationId));
}

export async function deleteExpiredVerifications() {
  await db
    .delete(verificationTokens)
    .where(lt(verificationTokens.expiresAt, new Date()));
}
