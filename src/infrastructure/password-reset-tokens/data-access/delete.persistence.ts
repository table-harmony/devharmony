import "server-only";

import { db } from "@/db";
import { passwordResetTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deletePasswordResetToken(id: string): Promise<void> {
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, id));
}

export async function deletePasswordResetTokenByEmail(
  email: string
): Promise<void> {
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.email, email));
}
