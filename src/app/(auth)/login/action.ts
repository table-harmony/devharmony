"use server";

import {
  getUserByEmail,
  getUserByCredentialsUseCase,
} from "@/infrastructure/users";

import * as z from "zod";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

import { LoginSchema } from "../schemas";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await getUserByCredentialsUseCase(
      { getUserByEmail: getUserByEmail },
      { email: email, password: password }
    );
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
