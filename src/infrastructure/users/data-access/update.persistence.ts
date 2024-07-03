import "server-only";

import { db } from "@/db";
import { users } from "@/db/schema";

import { eq } from "drizzle-orm";

import type { UpdateUserDto, UserId } from "../types";

export async function updateUser(userId: UserId, data: UpdateUserDto) {
  await db.update(users).set(data).where(eq(users.id, userId));
}
