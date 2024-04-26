"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { LoginSchema } from "../schemas";
import { signIn } from "@/lib/auth";

import {
  getUserByEmail,
  getUserByCredentialsUseCase,
} from "@/infrastructure/users";
import {
  createTwoFactorConfirmation,
  getTwoFactorConfirmationByUser,
  deleteTwoFactorConfirmation,
  createTwoFactorConfirmationUseCase,
} from "@/infrastructure/two-factor-confirmations";
import {
  createVerificationToken,
  createVerificationTokenUseCase,
  deleteVerificationToken,
  getVerificationTokenByEmail,
} from "@/infrastructure/verification-tokens";
import {
  createTwoFactorToken,
  createTwoFactorTokenUseCase,
  deleteTwoFactorToken,
  deleteTwoFactorTokenByEmail,
  deleteTwoFactorTokenByEmailUseCase,
  getTwoFactorTokenByEmail,
  getTwoFactorTokenByEmailUseCase,
} from "@/infrastructure/two-factor-tokens";

import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/resend";

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

    if (!existingUser.emailVerified) {
      const verificationToken = await createVerificationTokenUseCase(
        {
          getUserByEmail: getUserByEmail,
          getTokenByEmail: getVerificationTokenByEmail,
          deleteToken: deleteVerificationToken,
          createToken: createVerificationToken,
        },
        { email: existingUser.email }
      );

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return { success: "Confirmation email sent!" };
    }

    if (existingUser.isTwoFactorEnabled) {
      if (code) {
        const existingToken = await getTwoFactorTokenByEmailUseCase(
          { getTokenByEmail: getTwoFactorTokenByEmail },
          { email: existingUser.email }
        );

        if (!existingToken) throw new Error("Token not found!");

        if (existingToken.token !== code) throw new Error("Incorrect code!");

        await deleteTwoFactorTokenByEmailUseCase(
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
        const twoFactorToken = await createTwoFactorTokenUseCase(
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
