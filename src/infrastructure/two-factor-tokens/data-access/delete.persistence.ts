import "server-only";

import { db } from "@/db";
import { twoFactorTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteTwoFactorToken(id: string): Promise<void> {
  await db.delete(twoFactorTokens).where(eq(twoFactorTokens.id, id));
}

export async function deleteTwoFactorTokenByEmail(
  email: string
): Promise<void> {
  await db.delete(twoFactorTokens).where(eq(twoFactorTokens.email, email));
}
