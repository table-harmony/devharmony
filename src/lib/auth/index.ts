import { env } from "@/env";

import { db } from "@/db";
import { sessions, users } from "@/db/schema";

import { UserRole, AccountType } from "@/infrastructure/users";

import { Lucia } from "lucia";
import { GitHub } from "arctic";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      accountType: attributes.accountType,
      username: attributes.username,
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      googleId: attributes.googleId,
      githubId: attributes.githubId,
      password: attributes.password,
      salt: attributes.salt,
      image: attributes.image,
      role: attributes.role,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  accountType: AccountType;
  username: string | null;
  email: string;
  emailVerified: Date | null;
  googleId: string | null;
  githubId: string | null;
  password: string | null;
  salt: string | null;
  image: string | null;
  role: UserRole;
}

export const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET
);
