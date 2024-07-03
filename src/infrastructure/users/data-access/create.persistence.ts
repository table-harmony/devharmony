import "server-only";

import { db } from "@/db";
import { users } from "@/db/schema";

import type { CreateUserDto } from "../types";

export async function createUser(data: CreateUserDto) {
  const [user] = await db.insert(users).values(data).returning();
  return user;
}
