import { createResetToken, deleteExpiredResetTokens } from "./data-access";

import type { UserId } from "@/infrastructure/users";

export async function createResetTokenUseCase(userId: UserId) {
  return await createResetToken(userId);
}

export async function deleteExpiredResetTokensUseCase() {
  await deleteExpiredResetTokens();
}
