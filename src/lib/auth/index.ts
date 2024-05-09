import { db } from "@/db";

import NextAuth from "next-auth";
import { authConfig } from "./config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { getUser, getUserUseCase, UserRole } from "@/infrastructure/users";

import {
  getAccountByUser,
  getAccountByUserUseCase,
} from "@/infrastructure/accounts";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      try {
        const existingUser = await getUserUseCase(
          { getUser: getUser },
          { id: token.sub as string }
        );

        const account = await getAccountByUserUseCase(
          { getAccountByUser: getAccountByUser },
          { userId: existingUser.id }
        );

        token.isOAuth = !!account;
        token.role = existingUser.role;
      } catch (error) {
        return token;
      }

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
