import { createUser, getUserByEmail } from "../data-access";

import { CreateUserDto } from "../types";
import { generateSalt, hashPassword } from "../utils";

import { PublicError } from "@/utils/errors";

export async function createUserUseCase(data: CreateUserDto) {
  const existingUser = await getUserByEmail(data.email);
  if (existingUser)
    throw new PublicError("A user with that email already exists!");

  const user = await createUser(data);

  return user;
}

export async function createUserByCredentialsUseCase(data: {
  email: string;
  password: string;
}) {
  const existingUser = await getUserByEmail(data.email);
  if (existingUser)
    throw new PublicError("A user with that email already exists!");

  const salt = generateSalt();
  const hash = await hashPassword(data.password, salt);

  const user = await createUser({ email: data.email, password: hash, salt });

  return user;
}
