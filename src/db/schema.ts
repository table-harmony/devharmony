import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";

export const userRole = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name").notNull(),
  password: text("password"),
  email: text("email").unique().notNull(),
  image: text("image"),
  role: userRole("role").default("USER").notNull(),
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

export type UserRole = "USER" | "ADMIN";

export type Session = typeof sessions.$inferSelect;
export type User = typeof users.$inferSelect;
