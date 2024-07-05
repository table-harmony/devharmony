import "server-only";

import { db } from "@/db";
import { sessions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSessions() {
  return await db.query.sessions.findMany();
}

export async function deleteSession(sessionId: string) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}
