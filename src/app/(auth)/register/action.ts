"use server";

import {
  createUser,
  createUserUseCase,
  getUserByEmail,
} from "@/infrastructure/users";

import * as z from "zod";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

import { RegisterSchema } from "../schemas";

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;

  try {
    await createUserUseCase(
      { getUserByEmail: getUserByEmail, createUser: createUser },
      {
        email: email,
        password: password,
        name: name,
        image: `https://api.dicebear.com/8.x/initials/svg?seed=${name}`,
      }
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
