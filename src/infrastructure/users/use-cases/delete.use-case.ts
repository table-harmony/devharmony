import { DeleteUser } from "../types";

export async function deleteUserUseCase(
  context: { deleteUser: DeleteUser },
  data: { id: string }
) {
  await context.deleteUser(data.id);
}
