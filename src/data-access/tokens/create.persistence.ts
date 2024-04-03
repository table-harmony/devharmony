import "server-only";

import { db } from "@/db";
import {
  twoFactorTokens,
  passwordResetTokens,
  verificationTokens,
} from "@/db/schema";

import type { CreateTokenDto } from "@/use-cases/tokens/types";

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
