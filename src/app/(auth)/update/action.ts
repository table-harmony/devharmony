"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { UpdateSchema } from "../schemas";

import { currentUser } from "@/lib/auth/utils";

import {
  getUserUseCase,
  getUserByEmailUseCase,
  updateUserUseCase,
  createTokenUseCase,
} from "@/use-cases";

import {
  getUser,
  getUserByEmail,
  updateUser,
  getVerificationTokenByEmail,
  createVerificationToken,
  deleteVerificationToken,
} from "@/data-access";

import { sendVerificationEmail } from "../mail";

export const updateAction = async (values: z.infer<typeof UpdateSchema>) => {
  const user = await currentUser();

  try {
    if (!user || !user.id) {
      throw new Error("Unauthorized!");
    }

    if (user.isOAuth) {
      throw new Error("OAuth accounts cannot update data!");
    }

    const dbUser = await getUserUseCase({ getUser: getUser }, { id: user.id });

    if (values.email && user.email !== values.email) {
      const existingUser = await getUserByEmailUseCase(
        { getUserByEmail: getUserByEmail },
        { email: values.email }
      );

      if (existingUser && existingUser.id !== user.id) {
        throw new Error("Email already exists!");
      }

      const verificationToken = await createTokenUseCase(
        {
          getUserByEmail: getUserByEmail,
          getTokenByEmail: getVerificationTokenByEmail,
          deleteToken: deleteVerificationToken,
          createToken: createVerificationToken,
        },
        { email: dbUser.email }
      );

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return { success: "Verification email sent!" };
    }

    if (values.password && values.newPassword && dbUser.password) {
      const passwordsMatch = await bcrypt.compare(
        values.password,
        dbUser.password
      );

      if (!passwordsMatch) {
        throw new Error("Incorrect password!");
      }

      values.password = values.newPassword;
      values.newPassword = undefined;
    }

    const updatedUser = await updateUserUseCase(
      { getUser: getUser, updateUser: updateUser },
      { id: dbUser.id, ...values }
    );

    //TODO: update session
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }

  return { success: "User Updated!" };
};
