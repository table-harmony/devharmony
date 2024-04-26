"use server";

import * as z from "zod";
import { RegisterSchema } from "../schemas";

import { sendVerificationEmail } from "@/lib/resend";
import {
  createUser,
  createUserUseCase,
  getUserByEmail,
} from "@/infrastructure/users";
import {
  createVerificationToken,
  createVerificationTokenUseCase,
  deleteVerificationToken,
  getVerificationTokenByEmail,
} from "@/infrastructure/verification-tokens";

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

    const verificationToken = await createVerificationTokenUseCase(
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
