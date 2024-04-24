import "server-only";

import { db } from "@/db";
import { tokens } from "@/db/schema";

import type { CreateTokenDto } from "../types";

export async function createToken(token: CreateTokenDto): Promise<void> {
  await db.insert(tokens).values(token);
}
