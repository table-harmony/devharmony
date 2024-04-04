"use server";

import * as z from "zod";
import { RegisterSchema } from "../schemas";

import { createUserUseCase, createTokenUseCase } from "@/use-cases";

import {
  createUser,
  getUserByEmail,
  createVerificationToken,
  getVerificationTokenByEmail,
  deleteVerificationToken,
} from "@/data-access";

import { sendVerificationEmail } from "../mail";

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
      { email: email, password: password, name: name }
    );

    const verificationToken = await createTokenUseCase(
      {
        getUserByEmail: getUserByEmail,
        getTokenByEmail: getVerificationTokenByEmail,
        deleteToken: deleteVerificationToken,
        createToken: createVerificationToken,
      },
      { email: email }
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }

  return { success: "Confirmation email sent!" };
};
