import { GetUser, UserDto, GetUserByEmail, GetUsers } from "../types";

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

    return foundUser;
  } catch (error) {
    console.log("[GET_USER_BY_EMAIL_USE_CASE]: ERROR", error);
  }
}

export async function getUsersUseCase(context: {
  getUsers: GetUsers;
}): Promise<UserDto[]> {
  const foundUsers = await context.getUsers();

  return foundUsers;
}
