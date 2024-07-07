import {
  createResetToken,
  deleteExpiredResetTokens,
  deleteResetToken,
  deleteResetTokenById,
  getResetToken,
  getResetTokens,
} from "./data-access";

import type { UserId } from "@/infrastructure/users";

export async function createResetTokenUseCase(userId: UserId) {
  return await createResetToken(userId);
}

export async function getResetTokensUseCase() {
  return await getResetTokens();
}

export async function deleteResetTokenByIdUseCase(ResetTokenId: number) {
  await deleteResetTokenById(ResetTokenId);
}

export async function deleteExpiredResetTokensUseCase() {
  await deleteExpiredResetTokens();
}
