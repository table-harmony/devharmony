import { deleteUser } from "../data-access";

import { UserId } from "../types";

export async function deleteUserUseCase(userId: UserId) {
  await deleteUser(userId);
}
