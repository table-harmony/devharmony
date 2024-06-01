"use server";

import {
  deleteUser,
  deleteUserUseCase,
  updatePasswordUseCase,
  updateUser,
} from "@/infrastructure/users";

import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/auth";
import { authenticatedAction } from "@/lib/safe-action";

import { updateSchema } from "./_components/validation";

export async function deleteUserAction() {
  const { user } = await validateRequest();

  if (!user) return { error: "Session is invalid!" };

  await deleteUserUseCase({ deleteUser: deleteUser }, { id: user.id });

  return redirect("/");
}

export const updateUserAction = authenticatedAction(
  updateSchema,
  async ({ password }, { user }) => {
    await updatePasswordUseCase(
      { updateUser: updateUser },
      { id: user.id, password: password }
    );
  }
);
