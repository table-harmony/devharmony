import bcrypt from "bcryptjs";
import type { GetUser, UserDto, GetUserByEmail, GetUsers } from "@/use-cases";

/**
 * @throws throws an error if user does not exist
 */
export async function getUserUseCase(
  context: {
    getUser: GetUser;
  },
  data: { id: string }
): Promise<UserDto> {
  const foundUser = await context.getUser(data.id);

  return foundUser;
}

export async function getUserByEmailUseCase(
  context: {
    getUserByEmail: GetUserByEmail;
  },
  data: { email: string }
): Promise<UserDto | undefined> {
  try {
    const foundUser = await context.getUserByEmail(data.email);

    if (!foundUser) return undefined;

    return foundUser;
  } catch (error) {
    console.log("[GET_USER_BY_EMAIL_USE_CASE]: ERROR", error);
  }
}

/**
 * @throws throws an error if user does not exist or invalid credentials
 */
export async function getUserByCredentialsUseCase(
  context: {
    getUserByEmail: GetUserByEmail;
  },
  data: { email: string; password: string }
): Promise<UserDto> {
  const foundUser = await context.getUserByEmail(data.email);

  if (!foundUser || !foundUser.password) throw new Error("User not found!");

  const passwordsMatch = await bcrypt.compare(
    data.password,
    foundUser.password
  );

  if (!passwordsMatch) throw new Error("Invalid credentials!");

  return foundUser;
}

export async function getUsersUseCase(context: {
  getUsers: GetUsers;
}): Promise<UserDto[]> {
  const foundUsers = await context.getUsers();

  return foundUsers;
}
