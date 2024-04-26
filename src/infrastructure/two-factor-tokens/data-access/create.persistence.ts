import "server-only";

import { db } from "@/db";
import { twoFactorTokens } from "@/db/schema";

import type { CreateTwoFactorTokenDto } from "../types";

export async function createTwoFactorToken(
  token: CreateTwoFactorTokenDto
): Promise<void> {
  await db.insert(twoFactorTokens).values(token);
}
