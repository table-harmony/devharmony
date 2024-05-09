import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { randomUUID } from "crypto";

export const userRole = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name").notNull(),
  password: text("password"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image")
    .default("https://api.dicebear.com/8.x/initials/svg")
    .notNull(),
  role: userRole("role").default("USER").notNull(),
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false).notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export type UserRole = "USER" | "ADMIN";

export type User = typeof users.$inferSelect;
export type Account = typeof accounts.$inferSelect;
