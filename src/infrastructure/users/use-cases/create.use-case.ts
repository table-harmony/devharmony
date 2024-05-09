import { CreateUser, CreateUserDto, GetUserByEmail } from "../types";

import { UserEntity } from "../entity";

/**
 * @throws throws an error if user already exists
 */
export async function createUserUseCase(
  context: {
    getUserByEmail: GetUserByEmail;
    createUser: CreateUser;
  },
  data: CreateUserDto
) {
  const existingUser = await context.getUserByEmail(data.email);
  if (existingUser) throw new Error("User already exists!");

  const user = new UserEntity(data);
  await user.encryptPassword();

  await context.createUser(user.toCreateDto());
}
