import "server-only";

import { db } from "@/db";
import {
  passwordResetTokens,
  twoFactorTokens,
  verificationTokens,
} from "@/db/schema";

import type { CreateTokenDto } from "@/use-cases";

export async function createVerificationToken(
  token: CreateTokenDto
): Promise<void> {
  await db.insert(verificationTokens).values(token);
}

export async function createTwoFactorToken(
  token: CreateTokenDto
): Promise<void> {
  await db.insert(twoFactorTokens).values(token);
}

export async function createPasswordResetToken(
  token: CreateTokenDto
): Promise<void> {
  await db.insert(passwordResetTokens).values(token);
}
