import "server-only";

import { db } from "@/db";
import { users } from "@/db/schema";

import { eq } from "drizzle-orm";

import type { UserId } from "../types";

export async function deleteUser(userId: UserId) {
  await db.delete(users).where(eq(users.id, userId));
}
