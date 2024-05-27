import { UpdateUser, UserRole } from "../types";
import { generateSalt, hashPassword } from "../utils";

export async function verifyEmailUseCase(
  context: { updateUser: UpdateUser },
  data: { id: string }
) {
  const updatedUser = await context.updateUser(data.id, {
    emailVerified: new Date(),
  });

  return updatedUser;
}

export async function updatePasswordUseCase(
  context: { updateUser: UpdateUser },
  data: { id: string; password: string }
) {
  const salt = generateSalt();
  const hashedPassword = await hashPassword(data.password, salt);

  const updatedUser = await context.updateUser(data.id, {
    password: hashedPassword,
    salt: salt,
  });

  return updatedUser;
}

export async function updateUserRoleUseCase(
  context: { updateUser: UpdateUser },
  data: { id: string; role: UserRole }
) {
  const updatedUser = await context.updateUser(data.id, {
    role: data.role,
  });

  return updatedUser;
}
