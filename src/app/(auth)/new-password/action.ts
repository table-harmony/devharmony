"use server";

import * as z from "zod";
import { NewPasswordSchema } from "../schemas";

import {
  getUserByEmail,
  updateUser,
  getPasswordResetTokenByToken,
  deletePasswordResetToken,
} from "@/data-access";

import {
  getTokenByTokenUseCase,
  deleteTokenUseCase,
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
