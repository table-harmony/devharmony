import "server-only";

import { db } from "@/db";
import { twoFactorConfirmations } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteTwoFactorConfirmation(id: string): Promise<void> {
  await db
    .delete(twoFactorConfirmations)
    .where(eq(twoFactorConfirmations.id, id));
}

export async function deleteTwoFactorConfirmationByUser(
  userId: string
): Promise<void> {
  await db
    .delete(twoFactorConfirmations)
    .where(eq(twoFactorConfirmations.userId, userId));
}
