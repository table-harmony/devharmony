import "server-only";

import { sql } from "drizzle-orm";

import { db } from "@/db";

export async function runQuery(query: string) {
  const res = await db.execute(sql.raw(query));
  return res;
}
