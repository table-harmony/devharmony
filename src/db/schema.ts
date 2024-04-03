import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export const userRole = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  password: text("password"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image")
    .default("https://cdn-icons-png.flaticon.com/512/1531/1531344.png")
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

export const verificationTokens = pgTable("verification_token", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  email: text("email")
    .notNull()
    .references(() => users.email, { onDelete: "cascade" }),
  token: text("token")
    .unique()
    .notNull()
    .$defaultFn(() => uuidv4()),
  expires: timestamp("expires")
    .notNull()
    .$defaultFn(() => new Date(Date.now() + 3600 * 1000)),
});

export const passwordResetTokens = pgTable("password_reset_token", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  email: text("email")
    .notNull()
    .references(() => users.email, { onDelete: "cascade" }),
  token: text("token")
    .unique()
    .notNull()
    .$defaultFn(() => uuidv4()),
  expires: timestamp("expires")
    .notNull()
    .$defaultFn(() => new Date(Date.now() + 3600 * 1000)),
});

export const twoFactorTokens = pgTable("two_factor_token", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
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
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type UserRole = "USER" | "ADMIN";

export type User = typeof users.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type TwoFactorToken = typeof twoFactorTokens.$inferSelect;
export type TwoFactorConfirmation = typeof twoFactorConfirmations.$inferSelect;
