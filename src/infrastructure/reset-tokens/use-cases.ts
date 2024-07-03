import { UserId } from "@/infrastructure/users";

import {
  createResetToken,
  getResetToken,
  deleteResetToken,
} from "./data-access";
import { Token } from "./types";

export async function createResetTokenUseCase(userId: UserId) {
  return await createResetToken(userId);
}

export async function getResetTokenUseCase(token: Token) {
  return await getResetToken(token);
}

export async function deleteResetTokenUseCase(token: Token) {
  await deleteResetToken(token);
}
