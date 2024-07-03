import { updateUser } from "../data-access";

import { UpdateUserDto, UserId } from "../types";
import { generateSalt, hashPassword } from "../utils";

export async function updateUserUseCase(userId: UserId, data: UpdateUserDto) {
  await updateUser(userId, data);
}

export async function updatePasswordUseCase(userId: UserId, password: string) {
  const salt = generateSalt();
  const hash = await hashPassword(password, salt);

  await updateUser(userId, { password: hash, salt });
}
