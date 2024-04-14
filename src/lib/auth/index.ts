import { db } from "@/db";

import NextAuth from "next-auth";
import { authConfig } from "./config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import {
  UserRole,
  getUserUseCase,
  markEmailAsVerifiedUseCase,
  getAccountByUserUseCase,
  deleteTwoFactorConfirmationByUserUseCase,
} from "@/use-cases";

import {
  getUser,
  updateUser,
  getAccountByUser,
  deleteTwoFactorConfirmationByUser,
} from "@/data-access";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  events: {
    async linkAccount({ user }) {
      if (!user.id) return;

      try {
        await markEmailAsVerifiedUseCase(
          { getUser: getUser, updateUser: updateUser },
          { userId: user.id }
        );
      } catch (error) {
        console.log("[LINK_ACCOUNT]: ERROR", error);
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      try {
        const existingUser = await getUserUseCase(
          { getUser: getUser },
          { id: user.id as string }
        );

        // prevent sign in without email verification
        if (!existingUser.emailVerified) return false;

        // user two factor code enabled
        if (existingUser.isTwoFactorEnabled) {
          // delete two factor confirmation otherwise throw an error
          await deleteTwoFactorConfirmationByUserUseCase(
            {
              deleteTwoFactorConfirmationByUser:
                deleteTwoFactorConfirmationByUser,
            },
            { userId: existingUser.id }
          );
        }
      } catch (error) {
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.isTwoFactorEnabled && session.user)
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;

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
        token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
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
