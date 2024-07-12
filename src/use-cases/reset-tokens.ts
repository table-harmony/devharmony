import { deleteExpiredPasswordResetTokens } from "@/data-access/reset-tokens";

export async function deleteExpiredPasswordResetTokensUseCase() {
  await deleteExpiredPasswordResetTokens();
}
