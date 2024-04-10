"use server";

import { NewPasswordSchema } from "../schemas";
import * as z from "zod";

import {
  deletePasswordResetToken,
  getPasswordResetTokenByToken,
  getUserByEmail,
  updateUser,
} from "@/data-access";

import {
  deleteTokenUseCase,
  getTokenByTokenUseCase,
  resetPasswordUseCase,
} from "@/use-cases";

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
    const existingToken = await getTokenByTokenUseCase(
      { getTokenByToken: getPasswordResetTokenByToken },
      { token: token }
    );

    // update password
    await resetPasswordUseCase(
      { getUserByEmail: getUserByEmail, updateUser: updateUser },
      { email: existingToken.email, password }
    );

    await deleteTokenUseCase(
      { deleteToken: deletePasswordResetToken },
      { id: existingToken.id }
    );
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }

  return { success: "Password updated!" };
};
