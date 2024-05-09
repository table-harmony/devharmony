import { UserEntity } from "../entity";
import {
  GetUser,
  GetUserByEmail,
  UpdateUser,
  UpdateUserDto,
  UserDto,
} from "../types";

/**
 * @throws throws an error if user was not found
 */
export async function updateUserUseCase(
  context: {
    getUser: GetUser;
    updateUser: UpdateUser;
  },
  data: UpdateUserDto
): Promise<UserDto> {
  await context.getUser(data.id);

  const user = new UserEntity(data);
  if (user.getPassword()) await user.encryptPassword();

  await context.updateUser(user.toUpdateDto());

  const updatedUser = await context.getUser(data.id);
  return updatedUser;
}
