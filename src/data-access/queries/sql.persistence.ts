import "server-only";

import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function runQuery(query: string) {
  const res = await db.execute(sql.raw(query));
  return res;
}
