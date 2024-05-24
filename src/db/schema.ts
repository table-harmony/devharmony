import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";

export const userRoleEnum = pgEnum("role", ["member", "manager", "admin"]);
export const accountTypeEnum = pgEnum("type", ["email", "google", "github"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  accountType: accountTypeEnum("accountType").notNull(),
  username: text("username"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  googleId: text("googleId"),
  githubId: text("githubId"),
  password: text("password"),
  salt: text("salt"),
  image: text("image"),
  role: userRoleEnum("role").default("member").notNull(),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type UserRole = "member" | "manager" | "admin";
export type AccountType = "email" | "google" | "github";

export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
