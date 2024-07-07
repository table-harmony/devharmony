import {
  createVerification,
  deleteExpiredVerifications,
  deleteVerification,
  deleteVerificationById,
  getVerification,
  getVerifications,
} from "./data-access";

import type { UserId } from "@/infrastructure/users";

export async function createVerificationUseCase(userId: UserId) {
  return await createVerification(userId);
}

export async function getVerificationsUseCase() {
  return await getVerifications();
}

export async function deleteVerificationByIdUseCase(verificationId: number) {
  await deleteVerificationById(verificationId);
}

export async function deleteExpiredVerificationsUseCase() {
  await deleteExpiredVerifications();
}
