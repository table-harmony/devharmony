import "server-only";

import { db } from "@/db";
import { twoFactorConfirmations } from "@/db/schema";

import type { CreateTwoFactorConfirmationDto } from "@/use-cases/two-factor-confirmations/types";

export async function createTwoFactorConfirmation(
  twoFactorConfirmation: CreateTwoFactorConfirmationDto
): Promise<void> {
  await db.insert(twoFactorConfirmations).values(twoFactorConfirmation);
}
