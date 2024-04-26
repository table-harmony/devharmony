import "server-only";

import { db } from "@/db";
import { verificationTokens } from "@/db/schema";

import type { CreateVerificationTokenDto } from "../types";

export async function createVerificationToken(
  token: CreateVerificationTokenDto
): Promise<void> {
  await db.insert(verificationTokens).values(token);
}
