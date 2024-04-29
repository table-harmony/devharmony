import { CreateUser, CreateUserDto } from "../types";
import { userToCreateDto } from "../utils";

import { UserEntity } from "../entity";

/**
 * @throws throws an error if user already exists
 */
export async function createUserUseCase(
  context: {
    createUser: CreateUser;
  },
  data: CreateUserDto
) {
  const user = new UserEntity(data);

  await context.createUser(userToCreateDto(user));
}
