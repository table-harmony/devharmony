import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
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

export type UserRole = "USER" | "ADMIN";

export type User = typeof users.$inferSelect;
