"use server";

import { revalidatePath } from "next/cache";

import {
  UserRole,
  deleteUser,
  deleteUserUseCase,
  updateUser,
  updateUserRoleUseCase,
} from "@/infrastructure/users";

export async function deleteUserAction(userId: string) {
  if (!userId) return { error: "User id not provided!" };

  try {
    await deleteUserUseCase({ deleteUser: deleteUser }, { id: userId });

    revalidatePath("data");

    return { success: "User was successfully deleted!" };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
}

export async function updateUserAction(userId: string, role: UserRole) {
  if (!userId) return { error: "User id not provided!" };

  try {
    await updateUserRoleUseCase(
      { updateUser: updateUser },
      { id: userId, role: role }
    );

    revalidatePath("data");

    return { success: "User was successfully updated!" };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
}
