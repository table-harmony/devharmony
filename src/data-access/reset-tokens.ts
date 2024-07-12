import "server-only";

import { db } from "@/db";

import { resetTokens } from "@/db/schema";
import { eq, lt } from "drizzle-orm";

import {
  generateRandomToken,
  TOKEN_LENGTH,
  TOKEN_EXPIRATION,
} from "@/data-access/utils";

export async function createPasswordResetToken(userId: number) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION);

  await db
    .insert(resetTokens)
    .values({
      userId,
      token,
      expiresAt,
    })
    .onConflictDoUpdate({
      target: resetTokens.userId,
      set: {
        token,
        expiresAt,
      },
    });

  return token;
}

export async function getPasswordResetToken(token: string) {
  const existingToken = await db.query.resetTokens.findFirst({
    where: eq(resetTokens.token, token),
  });

  return existingToken;
}

export async function deletePasswordResetToken(token: string, trx = db) {
  await trx.delete(resetTokens).where(eq(resetTokens.token, token));
}

export async function deleteExpiredPasswordResetTokens() {
  await db.delete(resetTokens).where(lt(resetTokens.expiresAt, new Date()));
}
