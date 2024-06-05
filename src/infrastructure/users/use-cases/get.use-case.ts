import { ActionError } from "@/lib/safe-action";

import { UserEntity } from "../entity";
import { GetUser, GetUserByEmail, GetUsers } from "../types";
import { verifyPassword } from "../utils";

export async function getUserByCredentialsUseCase(
  context: {
    getUserByEmail: GetUserByEmail;
  },
  data: { email: string; password: string },
) {
  const foundUser = await context.getUserByEmail(data.email);

  if (!foundUser)
    throw new ActionError("An account with this email does not exist!");

  const entity = new UserEntity(foundUser);
  const passwordsMatch = await verifyPassword(entity, data.password);

  if (!passwordsMatch) throw new ActionError("Password does not match!");

  return foundUser;
}

export async function getUserByEmailUseCase(
  context: { getUserByEmail: GetUserByEmail },
  data: { email: string },
) {
  const foundUser = await context.getUserByEmail(data.email);
  return foundUser;
}

export async function getUserUseCase(
  context: { getUser: GetUser },
  data: { id: string },
) {
  const foundUser = await context.getUser(data.id);
  return foundUser;
}

export async function getUsersUseCase(context: { getUsers: GetUsers }) {
  const foundUsers = await context.getUsers();
  return foundUsers;
}
