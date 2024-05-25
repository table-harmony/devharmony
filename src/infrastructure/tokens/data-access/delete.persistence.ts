import "server-only";

import { db } from "@/db";
import { magicLinkTokens, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

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

export async function deleteMagicLinkToken(id: string): Promise<void> {
  await db.delete(magicLinkTokens).where(eq(magicLinkTokens.id, id));
}

export async function deleteMagicLinkTokenByEmail(
  email: string
): Promise<void> {
  await db.delete(magicLinkTokens).where(eq(magicLinkTokens.email, email));
}
