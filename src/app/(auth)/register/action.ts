"use server";

import { RegisterSchema } from "../schemas";
import * as z from "zod";

import {
  createUser,
  createVerificationToken,
  deleteVerificationToken,
  getUserByEmail,
  getVerificationTokenByEmail,
} from "@/data-access";

import { createTokenUseCase, createUserUseCase } from "@/use-cases";

import { sendVerificationEmail } from "@/lib/resend";

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
