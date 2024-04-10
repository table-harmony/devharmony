"use server";

import {
  deleteVerificationToken,
  getUser,
  getUserByEmail,
  getVerificationTokenByToken,
  updateUser,
} from "@/data-access";

import {
  deleteTokenUseCase,
  getTokenByTokenUseCase,
  getUserByEmailUseCase,
  markEmailAsVerifiedUseCase,
} from "@/use-cases";

export const newVerificationAction = async (token: string) => {
  try {
    const existingToken = await getTokenByTokenUseCase(
      { getTokenByToken: getVerificationTokenByToken },
      { token: token }
    );

    const existingUser = await getUserByEmailUseCase(
      { getUserByEmail: getUserByEmail },
      { email: existingToken.email }
    );

    if (!existingUser) {
      throw new Error("Email does not exist!");
    }

    // mark email as verified
    await markEmailAsVerifiedUseCase(
      { getUser: getUser, updateUser: updateUser },
      { userId: existingUser.id }
    );

    await deleteTokenUseCase(
      { deleteToken: deleteVerificationToken },
      { id: existingToken.id }
    );
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }

  return { success: "Email verified!" };
};
