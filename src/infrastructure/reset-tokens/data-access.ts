import "server-only";

import { db } from "@/db";
import { resetTokens } from "@/db/schema";

import { eq, lt } from "drizzle-orm";

import { TOKEN_EXPIRATION, TOKEN_LENGTH, generateRandomToken } from "./utils";

import type { UserId } from "@/infrastructure/users";

export async function createResetToken(userId: UserId) {
  const token = generateRandomToken(TOKEN_LENGTH);
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION);

  const [resetToken] = await db
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
    })
    .returning();

  return resetToken;
}

export async function getResetToken(token: string) {
  const existingToken = await db.query.resetTokens.findFirst({
    where: eq(resetTokens.token, token),
  });

  return existingToken;
}

export async function deleteResetToken(token: string, trx = db) {
  await trx.delete(resetTokens).where(eq(resetTokens.token, token));
}

export async function deleteExpiredResetTokens() {
  await db.delete(resetTokens).where(lt(resetTokens.expiresAt, new Date()));
}
