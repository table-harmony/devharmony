"use server";

import { deleteUser, deleteUserUseCase } from "@/infrastructure/users";

import { currentUser } from "@/lib/auth/utils";
import { signOut } from "@/lib/auth";

export const deleteAction = async () => {
  const user = await currentUser();

  try {
    if (!user || !user.id) {
      throw new Error("Unauthorized!");
    }
    await deleteUserUseCase({ deleteUser: deleteUser }, { id: user.id });
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
  await signOut();
};
