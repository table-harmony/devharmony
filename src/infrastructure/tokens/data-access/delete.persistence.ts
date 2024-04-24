import "server-only";

import { db } from "@/db";
import { tokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteToken(id: string): Promise<void> {
  await db.delete(tokens).where(eq(tokens.id, id));
}

export async function deleteTokenByEmail(email: string): Promise<void> {
  await db.delete(tokens).where(eq(tokens.email, email));
}
