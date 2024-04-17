import type { CreateUser, CreateUserDto, GetUserByEmail } from "@/use-cases";
import { UserEntity } from "@/entities";

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

  if (existingUser) throw new Error("User already exists!");

  const user = new UserEntity({
    email: data.email,
    password: data.password,
    name: data.name,
    image: data.image,
  });
  await user.encryptPassword();

  await context.createUser(user.toCreateDto());
}
