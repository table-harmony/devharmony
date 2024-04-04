"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { LoginSchema } from "../schemas";
import { signIn } from "@/lib/auth";

import {
  getUserByCredentialsUseCase,
  getTokenByEmailUseCase,
  createTokenUseCase,
  deleteTokenByEmailUseCase,
  createTwoFactorConfirmationUseCase,
} from "@/use-cases";

import {
  getUserByEmail,
  createVerificationToken,
  getVerificationTokenByEmail,
  deleteVerificationToken,
  createTwoFactorToken,
  getTwoFactorTokenByEmail,
  deleteTwoFactorToken,
  deleteTwoFactorTokenByEmail,
  createTwoFactorConfirmation,
  getTwoFactorConfirmationByUser,
  deleteTwoFactorConfirmation,
} from "@/data-access";

import { sendTwoFactorTokenEmail, sendVerificationEmail } from "../mail";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  try {
    const existingUser = await getUserByCredentialsUseCase(
      { getUserByEmail: getUserByEmail },
      { email: email, password: password }
    );

    // existing user email has not been verified
    if (!existingUser.emailVerified) {
      const verificationToken = await createTokenUseCase(
        {
          getUserByEmail: getUserByEmail,
          getTokenByEmail: getVerificationTokenByEmail,
          deleteToken: deleteVerificationToken,
          createToken: createVerificationToken,
        },
        { email: existingUser.email }
      );

      // send verification token
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return { success: "Confirmation email sent!" };
    }

    // existing user two factor code is enabled
    if (existingUser.isTwoFactorEnabled) {
      if (code) {
        const existingToken = await getTokenByEmailUseCase(
          { getTokenByEmail: getTwoFactorTokenByEmail },
          { email: existingUser.email }
        );

        if (!existingToken) throw new Error("Token not found!");

        if (existingToken.token !== code) throw new Error("Incorrect code!");

        await deleteTokenByEmailUseCase(
          { deleteTokenByEmail: deleteTwoFactorTokenByEmail },
          { email: existingToken.email }
        );

        await createTwoFactorConfirmationUseCase(
          {
            getTwoFactorConfirmationByUser: getTwoFactorConfirmationByUser,
            createTwoFactorConfirmation: createTwoFactorConfirmation,
            deleteTwoFactorConfirmation: deleteTwoFactorConfirmation,
          },
          { userId: existingUser.id }
        );
      } else {
        const twoFactorToken = await createTokenUseCase(
          {
            getUserByEmail: getUserByEmail,
            getTokenByEmail: getTwoFactorTokenByEmail,
            deleteToken: deleteTwoFactorToken,
            createToken: createTwoFactorToken,
          },
          { email: existingUser.email }
        );

        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );

        return { twoFactor: true };
      }
    }
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
