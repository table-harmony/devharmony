"use server";

import { deleteUserUseCase } from "@/use-cases";
import { deleteUser } from "@/data-access";
import { revalidatePath } from "next/cache";

export const deleteAction = async (userId: string) => {
  try {
    if (!userId) throw new Error("Unauthorized!");

    await deleteUserUseCase({ deleteUser: deleteUser }, { id: userId });

    revalidatePath("data");
    return { success: "User was successfully deleted!" };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
};
