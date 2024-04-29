import { pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export const userRole = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  password: text("password"),
  email: text("email").unique().notNull(),
  image: text("image").notNull(),
  role: userRole("role").default("USER").notNull(),
});

export type UserRole = "USER" | "ADMIN";

export type User = typeof users.$inferSelect;
