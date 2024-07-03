import {
  createVerification,
  deleteVerification,
  getVerification,
} from "./data-access";

import { Token } from "./types";

import type { UserId } from "@/infrastructure/users";

export async function createVerificationUseCase(userId: UserId) {
  return await createVerification(userId);
}

export async function getVerificationUseCase(token: Token) {
  return await getVerification(token);
}

export async function deleteVerificationUseCase(token: Token) {
  await deleteVerification(token);
}
