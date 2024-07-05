import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").default("Anonymous").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: integer("email_verified", { mode: "timestamp" }),
  googleId: text("google_id").unique(),
  password: text("password"),
  salt: text("salt"),
  picture: text("picture"),
  role: text("role", { enum: ["member", "manager", "admin"] }).default(
    "member",
  ),
});

export const verificationTokens = sqliteTable("verification_token", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  token: text("token").notNull().unique(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  expiresAt: integer("expires_at").notNull(),
});

export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type VerificationToken = typeof verificationTokens.$inferSelect;
