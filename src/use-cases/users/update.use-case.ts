import {
  GetUser,
  GetUserByEmail,
  UpdateUser,
  UpdateUserDto,
  UserDto,
} from "@/use-cases";

import { UserEntity } from "@/entities";

/**
 * @throws throws an error if user was not found
 */
export async function markEmailAsVerifiedUseCase(
  context: {
    getUser: GetUser;
    updateUser: UpdateUser;
  },
  data: { userId: number }
): Promise<UserDto> {
  const user = await context.getUser(data.userId);

  // entity
  const userEntity = new UserEntity(user);
  userEntity.verifyEmail();

  // update user by entity
  await context.updateUser(userEntity.toDto());

  return userEntity.toDto();
}

/**
 * @throws throws an error if user was not found
 */
export async function resetPasswordUseCase(
  context: {
    getUserByEmail: GetUserByEmail;
    updateUser: UpdateUser;
  },
  data: { email: string; password: string }
): Promise<UserDto> {
  const user = await context.getUserByEmail(data.email);

  // user does not exist
  if (!user) throw new Error("User not found!");

  // entity
  const userEntity = new UserEntity(user);
  await userEntity.setPassword(data.password);

  // update user by entity
  await context.updateUser(userEntity.toDto());

  return userEntity.toDto();
}

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

  // entity
  const userEntity = new UserEntity(data);
  if (userEntity.getPassword()) await userEntity.encryptPassword();

  // update user by entity
  await context.updateUser(userEntity.toUpdateDto());

  // get updated user by id
  const updatedUser = await context.getUser(data.id);

  return updatedUser;
}
