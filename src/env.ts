import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    POSTGRES_URL: z.string().url(),
    NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
    AUTH_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_GITHUB_ID: z.string(),
    NEXT_PUBLIC_GITHUB_SECRET: z.string(),
    NEXT_PUBLIC_GOOGLE_ID: z.string(),
    NEXT_PUBLIC_GOOGLE_SECRET: z.string(),
    NEXT_PUBLIC_DISCORD_ID: z.string(),
    NEXT_PUBLIC_DISCORD_SECRET: z.string(),
  },
  runtimeEnv: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    NODE_ENV: process.env.NODE_ENV,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_GITHUB_ID: process.env.NEXT_PUBLIC_GITHUB_ID,
    NEXT_PUBLIC_GITHUB_SECRET: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    NEXT_PUBLIC_GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
    NEXT_PUBLIC_GOOGLE_SECRET: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    NEXT_PUBLIC_DISCORD_ID: process.env.NEXT_PUBLIC_DISCORD_ID,
    NEXT_PUBLIC_DISCORD_SECRET: process.env.NEXT_PUBLIC_DISCORD_SECRET,
  },
});
