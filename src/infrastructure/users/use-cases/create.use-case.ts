import { CreateUser, GetUserByEmail } from "../types";
import { generateSalt, hashPassword } from "../utils";

export async function createUserUseCase(
  context: {
    getUserByEmail: GetUserByEmail;
    createUser: CreateUser;
  },
  data: { email: string; password: string }
) {
  const existingUser = await context.getUserByEmail(data.email);

  if (existingUser)
    throw new Error("An account with that email already exists!");

  const salt = generateSalt();
  const hashedPassword = await hashPassword(data.password, salt);

  const user = await context.createUser({
    email: data.email,
    password: hashedPassword,
    salt: salt,
  });

  return user;
}
