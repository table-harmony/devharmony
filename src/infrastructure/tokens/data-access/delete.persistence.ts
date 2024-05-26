import "server-only";

import { db } from "@/db";
import { magicLinkTokens, verificationTokens } from "@/db/schema";
import { eq, lt } from "drizzle-orm";

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
