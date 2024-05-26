import { UpdateUser } from "../types";

export async function verifyEmailUseCase(
  context: { updateUser: UpdateUser },
  data: { id: string }
) {
  const updatedUser = await context.updateUser(data.id, {
    emailVerified: new Date(Date.now()),
  });

  return updatedUser;
}
