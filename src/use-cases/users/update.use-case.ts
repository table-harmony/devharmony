import { UserEntity } from "@/entities";
import {
  GetUser,
  GetUserByEmail,
  UpdateUser,
  UpdateUserDto,
  UserDto,
} from "./types";
import { encryptUserPassword, userToDto, userToUpdateDto } from "./utils";

/**
 * @throws throws an error if user was not found
 */
export async function markEmailAsVerifiedUseCase(
  context: {
    getUser: GetUser;
    updateUser: UpdateUser;
  },
  data: { userId: string }
): Promise<UserDto> {
  const foundUser = await context.getUser(data.userId);

  const user = new UserEntity(foundUser);
  user.verifyEmail();

  await context.updateUser(userToDto(user));

  return userToDto(user);
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
  const foundUser = await context.getUserByEmail(data.email);
  if (!foundUser) throw new Error("User not found!");

  const user = new UserEntity(foundUser);

  user.setPassword(data.password);
  await encryptUserPassword(user);

  await context.updateUser(userToUpdateDto(user));
  return userToDto(user);
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

  const user = new UserEntity(data);
  if (data.password) {
    user.setPassword(data.password);
    await encryptUserPassword(user);
  }

  await context.updateUser(userToUpdateDto(user));

  const updatedUser = await context.getUser(data.id);
  return updatedUser;
}
