"use server";

import {
  getUser,
  updateUser,
  getUserByEmail,
  getVerificationTokenByToken,
  deleteVerificationToken,
} from "@/data-access";

import {
  getUserByEmailUseCase,
  markEmailAsVerifiedUseCase,
  getTokenByTokenUseCase,
  deleteTokenUseCase,
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
