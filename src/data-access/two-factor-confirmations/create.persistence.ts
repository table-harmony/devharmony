import "server-only";

import { db } from "@/db";
import { twoFactorConfirmations } from "@/db/schema";

import type { CreateTwoFactorConfirmationDto } from "@/use-cases";

export async function createTwoFactorConfirmation(
  twoFactorConfirmation: CreateTwoFactorConfirmationDto
): Promise<void> {
  await db.insert(twoFactorConfirmations).values(twoFactorConfirmation);
}
