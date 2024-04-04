import "server-only";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { UpdateUserDto } from "@/use-cases";

export async function updateUser(user: UpdateUserDto): Promise<void> {
  await db.update(users).set(user).where(eq(users.id, user.id));
}
