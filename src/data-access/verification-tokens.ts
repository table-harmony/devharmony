import "server-only";

import { db } from "@/db";

import { verificationTokens } from "@/db/schema";
import { eq, lt } from "drizzle-orm";

import {
  generateRandomToken,
  TOKEN_LENGTH,
  TOKEN_EXPIRATION,
} from "@/data-access/utils";

export async function createVerificationToken(userId: number) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION);

  await db
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
    });

  return token;
}

export async function getVerificationToken(token: string) {
  const existingToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  return existingToken;
}

export async function deleteVerificationToken(token: string, trx = db) {
  await trx
    .delete(verificationTokens)
    .where(eq(verificationTokens.token, token));
}

export async function deleteExpiredVerificationTokens() {
  await db
    .delete(verificationTokens)
    .where(lt(verificationTokens.expiresAt, new Date()));
}
