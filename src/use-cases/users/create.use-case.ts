import type {
  CreateUser,
  CreateUserDto,
  GetUserByEmail,
} from "@/use-cases/users/types";
import { UserEntity } from "@/entities/user";

/**
 * @throws throws an error if user already exists
 */
export async function createUserUseCase(
  context: {
    getUserByEmail: GetUserByEmail;
    createUser: CreateUser;
  },
  data: CreateUserDto
): Promise<void> {
  const existingUser = await context.getUserByEmail(data.email);

  // user already exists
  if (existingUser) throw new Error("User already exists!");

  // create entity from data
  const user = new UserEntity({
    email: data.email,
    password: data.password,
    name: data.name,
  });
  await user.encryptPassword();

  // create user from entity data
  await context.createUser(user.toCreateDto());
}
