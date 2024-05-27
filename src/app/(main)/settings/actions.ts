"use server";

import { redirect } from "next/navigation";

import {
  deleteUser,
  deleteUserUseCase,
  updatePasswordUseCase,
  updateUser,
} from "@/infrastructure/users";

import { validateRequest } from "@/lib/auth";

export async function deleteUserAction() {
  const { user } = await validateRequest();

  if (!user) return { error: "Unauthorized!" };

  await deleteUserUseCase({ deleteUser: deleteUser }, { id: user.id });

  return redirect("/");
}

export async function updateUserAction(password: string) {
  const { user } = await validateRequest();

  if (!user) return { error: "Unauthorized!" };

  try {
    await updatePasswordUseCase(
      { updateUser: updateUser },
      { id: user.id, password: password }
    );
  } catch (e) {
    const error = e as Error;
    return { error: error.message };
  }

  return { success: "User successfully updated!" };
}
