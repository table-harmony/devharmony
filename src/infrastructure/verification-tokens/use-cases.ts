import { createVerification, deleteExpiredVerifications } from "./data-access";

import type { UserId } from "@/infrastructure/users";

export async function createVerificationUseCase(userId: UserId) {
  return await createVerification(userId);
}

export async function deleteExpiredVerificationsUseCase() {
  await deleteExpiredVerifications();
}
