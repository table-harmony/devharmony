import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
});
