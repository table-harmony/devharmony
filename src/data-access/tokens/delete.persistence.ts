import "server-only";

import { db } from "@/db";
import {
  passwordResetTokens,
  twoFactorTokens,
  verificationTokens,
} from "@/db/schema";
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

export async function deleteTwoFactorToken(id: string): Promise<void> {
  await db.delete(twoFactorTokens).where(eq(twoFactorTokens.id, id));
}

export async function deleteTwoFactorTokenByEmail(
  email: string
): Promise<void> {
  await db.delete(twoFactorTokens).where(eq(twoFactorTokens.email, email));
}

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
