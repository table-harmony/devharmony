import "server-only";

import { db } from "@/db";
import { resetTokens } from "@/db/schema";

import { eq } from "drizzle-orm";

import { TOKEN_EXPIRATION, TOKEN_LENGTH, generateRandomToken } from "./utils";
import { UserId } from "@/infrastructure/users";
import { Token } from "./types";

export async function createResetToken(userId: UserId) {
  const token = generateRandomToken(TOKEN_LENGTH);
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

export async function getResetToken(token: Token) {
  const existingToken = await db.query.resetTokens.findFirst({
    where: eq(resetTokens.token, token),
  });

  return existingToken;
}

export async function deleteResetToken(token: Token) {
  await db.delete(resetTokens).where(eq(resetTokens.token, token));
}
