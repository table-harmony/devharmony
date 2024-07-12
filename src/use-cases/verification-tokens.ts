import {
  createVerificationToken,
  deleteExpiredVerificationTokens,
} from "@/data-access/verification-tokens";

export async function createVerificationTokenUseCase(userId: number) {
  const token = await createVerificationToken(userId);

  return token;
}

export async function deleteExpiredVerificationTokensUseCase() {
  await deleteExpiredVerificationTokens();
}
