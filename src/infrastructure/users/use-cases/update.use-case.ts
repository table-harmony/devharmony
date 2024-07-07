import { createTransaction } from "@/infrastructure/utils";
import {
  deleteVerification,
  getVerification,
} from "@/infrastructure/verification-tokens";
import { deleteResetToken, getResetToken } from "@/infrastructure/reset-tokens";

import { updatePassword, updateUser } from "../data-access";

import { UpdateUserDto, UserId } from "../types";

import { PublicError } from "@/utils/errors";

export async function updateUserUseCase(userId: UserId, data: UpdateUserDto) {
  await updateUser(userId, data);
}

export async function updatePasswordUseCase(userId: UserId, password: string) {
  await updatePassword(userId, password);
}

export async function resetPasswordUseCase(token: string, password: string) {
  const resetToken = await getResetToken(token);

  if (!resetToken) throw new PublicError("Invalid token!");

  if (resetToken.expiresAt.getTime() < Date.now())
    throw new PublicError("Expired token!");

  await createTransaction(async (trx) => {
    await deleteResetToken(token, trx);
    await updatePassword(resetToken.userId, password, trx);
  });
}

export async function verifyEmailUseCase(token: string) {
  const verification = await getVerification(token);

  if (!verification) throw new PublicError("Invalid token!");

  if (verification.expiresAt.getTime() < Date.now())
    throw new PublicError("Expired token!");

  await createTransaction(async (trx) => {
    await deleteVerification(token, trx);
    await updateUser(verification.userId, { emailVerified: new Date() }, trx);
  });

  return verification.userId;
}
