import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";

export const userRoleEnum = pgEnum("role", ["member", "manager", "admin"]);
export const accountTypeEnum = pgEnum("type", ["google", "github"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  username: text("username"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  salt: text("salt"),
  image: text("image"),
  role: userRoleEnum("role").default("member").notNull(),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  type: accountTypeEnum("type").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type UserRole = "member" | "manager" | "admin";
export type AccountType = "google" | "github";

export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
