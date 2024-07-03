import * as schema from "./schema";

import { env } from "@/env";

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DB_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
