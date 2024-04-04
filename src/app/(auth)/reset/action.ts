"use server";

import * as z from "zod";

import { ResetSchema } from "../schemas";

import { createPasswordResetToken } from "@/data-access/tokens/create.persistence";
import { getUserByEmail } from "@/data-access/users/get.persistence";

import { getUserByEmailUseCase } from "@/use-cases/users/get.use-case";
import { createTokenUseCase } from "@/use-cases/tokens/create.use-case";
import { sendPasswordResetTokenEmail } from "../mail";
import { getPasswordResetTokenByEmail } from "@/data-access/tokens/get.persistence";
import { deletePasswordResetToken } from "@/data-access/tokens/delete.persistence";

export const resetAction = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Email!" };
  }

  const { email } = validatedFields.data;

  try {
    // find user by email
    const existingUser = await getUserByEmailUseCase(
      { getUserByEmail: getUserByEmail },
      { email: email }
    );

    if (!existingUser || !existingUser.email || !existingUser.password) {
      throw new Error("User does not exist!");
    }

    // create password reset token
    const passwordResetToken = await createTokenUseCase(
      {
        getUserByEmail: getUserByEmail,
        getTokenByEmail: getPasswordResetTokenByEmail,
        deleteToken: deletePasswordResetToken,
        createToken: createPasswordResetToken,
      },
      { email: existingUser.email }
    );

    // send password reset token
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
