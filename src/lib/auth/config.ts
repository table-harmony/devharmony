import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { getUserByCredentialsUseCase, type UserDto } from "@/use-cases";
import { getUserByEmail } from "@/data-access";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
} satisfies NextAuthConfig;
