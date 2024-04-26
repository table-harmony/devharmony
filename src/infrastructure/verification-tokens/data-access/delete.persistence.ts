import "server-only";

import { db } from "@/db";
import { verificationTokens } from "@/db/schema";
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
