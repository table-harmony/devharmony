import { createTransaction } from "@/infrastructure/utils";
import {
  deleteVerification,
  getVerification,
} from "@/infrastructure/verification-tokens";
import { deleteResetToken, getResetToken } from "@/infrastructure/reset-tokens";

import { updateUser } from "../data-access";
import { UpdateUserDto, UserId } from "../types";
import { generateSalt, hashPassword } from "../utils";

import { PublicError } from "@/utils/errors";

export async function updateUserUseCase(userId: UserId, data: UpdateUserDto) {
  await updateUser(userId, data);
}

export async function updatePasswordUseCase(userId: UserId, password: string) {
  const salt = generateSalt();
  const hash = await hashPassword(password, salt);

  await updateUser(userId, { password: hash, salt });
}

export async function resetPasswordUseCase(token: string, password: string) {
  const resetToken = await getResetToken(token);

  if (!resetToken) throw new PublicError("Invalid token!");

  if (resetToken.expiresAt.getTime() < Date.now())
    throw new PublicError("Expired token!");

  await createTransaction(async (trx) => {
    await deleteResetToken(token, trx);

    const salt = generateSalt();
    const hash = await hashPassword(password, salt);

    await updateUser(resetToken.userId, { password: hash, salt });
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
