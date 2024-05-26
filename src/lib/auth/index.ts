import { env } from "@/env";

import { db } from "@/db";
import { sessions, users } from "@/db/schema";

import { UserRole } from "@/infrastructure/users";

import { Lucia } from "lucia";
import { Google } from "arctic";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: true,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      username: attributes.username,
      email: attributes.email,
      emailVerified: attributes.emailVerified,
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
  username: string | null;
  email: string;
  emailVerified: Date | null;
  password: string | null;
  salt: string | null;
  image: string | null;
  role: UserRole;
}

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  `${env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
);
