import type { AdapterAccount } from "@auth/core/adapters";
import crypto from "crypto";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { siteConfig } from "@/config/site";

export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  password: text("password"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image").default(siteConfig.ogImage).notNull(),
  roles: text("roles").array().notNull(),
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false).notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: serial("userId")
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

export const verificationTokens = pgTable("verification_token", {
  id: serial("id").primaryKey(),
  email: text("email")
    .notNull()
    .references(() => users.email, { onDelete: "cascade" }),
  token: uuid("token").defaultRandom().notNull(),
  expires: timestamp("expires")
    .notNull()
    .$defaultFn(() => new Date(Date.now() + 3600 * 1000)),
});

export const passwordResetTokens = pgTable("password_reset_token", {
  id: serial("id").primaryKey(),
  email: text("email")
    .notNull()
    .references(() => users.email, { onDelete: "cascade" }),
  token: uuid("token").defaultRandom().notNull(),
  expires: timestamp("expires")
    .notNull()
    .$defaultFn(() => new Date(Date.now() + 3600 * 1000)),
});

export const twoFactorTokens = pgTable("two_factor_token", {
  id: serial("id").primaryKey(),
  email: text("email")
    .notNull()
    .references(() => users.email, { onDelete: "cascade" }),
  token: text("token")
    .unique()
    .notNull()
    .$defaultFn(() => crypto.randomInt(100_000, 1_000_000).toString()),
  expires: timestamp("expires")
    .notNull()
    .$defaultFn(() => new Date(Date.now() + 5 * 60 * 1000)),
});

export const twoFactorConfirmations = pgTable("two_factor_confirmation", {
  id: serial("id").primaryKey(),
  userId: serial("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type User = typeof users.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type TwoFactorToken = typeof twoFactorTokens.$inferSelect;
export type TwoFactorConfirmation = typeof twoFactorConfirmations.$inferSelect;
