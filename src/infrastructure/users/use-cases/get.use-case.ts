import {
  getUser,
  getUserByEmail,
  getUserByGoogle,
  getUsers,
} from "../data-access";

import { UserId } from "../types";
import { hashPassword } from "../utils";

import { PublicError } from "@/utils/errors";

export async function getUserUseCase(userId: UserId) {
  return await getUser(userId);
}

export async function getUserByEmailUseCase(email: string) {
  return await getUserByEmail(email);
}
export async function getUserByGoogleUseCase(googleId: string) {
  return await getUserByGoogle(googleId);
}

export async function getUsersUseCase() {
  return await getUsers();
}

export async function getUserByCredentialsUseCase(data: {
  email: string;
  password: string;
}) {
  const user = await getUserByEmail(data.email);
  if (!user) throw new PublicError("A user with that email doesn't exist!");

  if (!user.password || !user.salt)
    throw new PublicError("User doesn't have a password!");

  const hash = await hashPassword(data.password, user.salt);

  if (hash !== user.password) throw new PublicError("Incorrect credentials!");

  return user;
}
