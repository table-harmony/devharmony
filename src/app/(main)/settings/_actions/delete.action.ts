"use server";

import { deleteUser } from "@/data-access";

import { deleteUserUseCase } from "@/use-cases";

import { signOut } from "@/lib/auth";
import { currentUser } from "@/lib/auth/utils";

export const deleteAction = async () => {
  const user = await currentUser();

  try {
    if (!user || !user.id) {
      throw new Error("Unauthorized!");
    }
    await deleteUserUseCase({ deleteUser: deleteUser }, { id: user.id });
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
  await signOut();
};
