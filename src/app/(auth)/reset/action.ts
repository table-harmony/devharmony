"use server";

import * as z from "zod";

import { ResetSchema } from "../schemas";

import { sendPasswordResetTokenEmail } from "@/lib/resend";
import { getUserByEmail, getUserByEmailUseCase } from "@/infrastructure/users";
import {
  createPasswordResetToken,
  createPasswordResetTokenUseCase,
  deletePasswordResetToken,
  getPasswordResetTokenByEmail,
} from "@/infrastructure/password-reset-tokens";

export const resetAction = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Email!" };
  }

  const { email } = validatedFields.data;

  try {
    const existingUser = await getUserByEmailUseCase(
      { getUserByEmail: getUserByEmail },
      { email: email }
    );

    if (!existingUser || !existingUser.email || !existingUser.password) {
      throw new Error("User does not exist!");
    }

    const passwordResetToken = await createPasswordResetTokenUseCase(
      {
        getUserByEmail: getUserByEmail,
        getTokenByEmail: getPasswordResetTokenByEmail,
        deleteToken: deletePasswordResetToken,
        createToken: createPasswordResetToken,
      },
      { email: existingUser.email }
    );

    await sendPasswordResetTokenEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }

  return { success: "Reset email sent!" };
};
