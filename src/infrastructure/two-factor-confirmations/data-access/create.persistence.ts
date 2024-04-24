import "server-only";

import { db } from "@/db";
import { twoFactorConfirmations } from "@/db/schema";

import type { CreateTwoFactorConfirmationDto } from "../types";

export async function createTwoFactorConfirmation(
  twoFactorConfirmation: CreateTwoFactorConfirmationDto
): Promise<void> {
  await db.insert(twoFactorConfirmations).values(twoFactorConfirmation);
}
