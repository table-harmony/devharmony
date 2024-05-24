import { UserEntity } from "../entity";
import { GetUserByEmail } from "../types";
import { verifyPassword } from "../utils";

export async function getUserByCredentialsUseCase(
  context: {
    getUserByEmail: GetUserByEmail;
  },
  data: { email: string; password: string }
) {
  const foundUser = await context.getUserByEmail(data.email);

  if (!foundUser) throw new Error("An account with that email does not exist!");

  const entity = new UserEntity(foundUser);
  const isPasswordVerified = await verifyPassword(entity, data.password);

  if (!isPasswordVerified) throw new Error("The password does not match!");

  return foundUser;
}

export async function getUserByEmailUseCase(
  context: { getUserByEmail: GetUserByEmail },
  data: { email: string }
) {
  const foundUser = await context.getUserByEmail(data.email);
  return foundUser;
}
