import { db } from "@/db";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";

import { DrizzleAdapter } from "@auth/drizzle-adapter";

import {
  getUserByEmail,
  UserDto,
  getUserByCredentialsUseCase,
  getUser,
  getUserUseCase,
  UserRole,
} from "@/infrastructure/users";
import {
  getAccountByUser,
  getAccountByUserUseCase,
} from "@/infrastructure/accounts";
import { env } from "@/env";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      try {
        await getUserUseCase({ getUser: getUser }, { id: user.id as string });
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
  providers: [
    Google({
      clientId: env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
    Github({
      clientId: env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
    Discord({
      clientId: env.NEXT_PUBLIC_DISCORD_ID,
      clientSecret: env.NEXT_PUBLIC_DISCORD_SECRET,
    }),
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Joedoe@gmail.com",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials): Promise<UserDto> {
        const user = await getUserByCredentialsUseCase(
          { getUserByEmail: getUserByEmail },
          {
            email: credentials.email as string,
            password: credentials.password as string,
          }
        );

        return user;
      },
    }),
  ],
});
