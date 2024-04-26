import "server-only";

import { db } from "@/db";
import { passwordResetTokens } from "@/db/schema";

import type { CreatePasswordResetTokenDto } from "../types";

export async function createPasswordResetToken(
  token: CreatePasswordResetTokenDto
): Promise<void> {
  await db.insert(passwordResetTokens).values(token);
}
