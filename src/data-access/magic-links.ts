import "server-only";

import { db } from "@/db";
import { magicLinks } from "@/db/schema";

import { eq, lt } from "drizzle-orm";

import {
  generateRandomToken,
  TOKEN_EXPIRATION,
  TOKEN_LENGTH,
} from "@/data-access/utils";

export async function createMagicLink(email: string) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION);

  await db
    .insert(magicLinks)
    .values({
      email,
      token,
      expiresAt,
    })
    .onConflictDoUpdate({
      target: magicLinks.email,
      set: {
        token,
        expiresAt,
      },
    });

  return token;
}

export async function getMagicLinkByToken(token: string) {
  const existingToken = await db.query.magicLinks.findFirst({
    where: eq(magicLinks.token, token),
  });

  return existingToken;
}

export async function deleteMagicLink(token: string) {
  await db.delete(magicLinks).where(eq(magicLinks.token, token));
}

export async function deleteExpiredMagicLinks() {
  await db.delete(magicLinks).where(lt(magicLinks.expiresAt, new Date()));
}
