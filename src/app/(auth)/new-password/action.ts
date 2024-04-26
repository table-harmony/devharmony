"use server";

import * as z from "zod";
import { NewPasswordSchema } from "../schemas";

import {
  deletePasswordResetToken,
  deletePasswordResetTokenUseCase,
  getPasswordResetTokenByToken,
  getPasswordResetTokenByTokenUseCase,
} from "@/infrastructure/password-reset-tokens";
import {
  getUserByEmail,
  resetPasswordUseCase,
  updateUser,
} from "@/infrastructure/users";

export const newPasswordAction = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  try {
    const existingToken = await getPasswordResetTokenByTokenUseCase(
      { getTokenByToken: getPasswordResetTokenByToken },
      { token: token }
    );

    await resetPasswordUseCase(
      { getUserByEmail: getUserByEmail, updateUser: updateUser },
      { email: existingToken.email, password }
    );

    await deletePasswordResetTokenUseCase(
      { deleteToken: deletePasswordResetToken },
      { id: existingToken.id }
    );
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }

  return { success: "Password updated!" };
};
