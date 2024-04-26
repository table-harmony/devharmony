"use server";

import {
  getUser,
  getUserByEmail,
  getUserByEmailUseCase,
  markEmailAsVerifiedUseCase,
  updateUser,
} from "@/infrastructure/users";
import {
  deleteVerificationToken,
  deleteVerificationTokenUseCase,
  getVerificationTokenByToken,
  getVerificationTokenByTokenUseCase,
} from "@/infrastructure/verification-tokens";

export const newVerificationAction = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByTokenUseCase(
      { getTokenByToken: getVerificationTokenByToken },
      { token: token }
    );

    const existingUser = await getUserByEmailUseCase(
      { getUserByEmail: getUserByEmail },
      { email: existingToken.email }
    );

    if (!existingUser) throw new Error("Email does not exist!");

    await markEmailAsVerifiedUseCase(
      { getUser: getUser, updateUser: updateUser },
      { userId: existingUser.id }
    );

    await deleteVerificationTokenUseCase(
      { deleteToken: deleteVerificationToken },
      { id: existingToken.id }
    );
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }

  return { success: "Email verified!" };
};
