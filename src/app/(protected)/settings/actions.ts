"use server";

import { redirect } from "next/navigation";

import {
  deleteUser,
  deleteUserUseCase,
  updatePasswordUseCase,
  updateUser,
} from "@/infrastructure/users";

import { validateRequest } from "@/lib/auth";
import { authenticatedAction } from "@/lib/safe-action";

import { updatePasswordSchema } from "./validation";

export async function deleteUserAction() {
  const { user } = await validateRequest();

  if (!user) return { error: "Session is invailid!" };

  await deleteUserUseCase({ deleteUser: deleteUser }, { id: user.id });

  return redirect("/");
}

export const updatePasswordAction = authenticatedAction(
  updatePasswordSchema,
  async ({ password }, { user }) => {
    await updatePasswordUseCase(
      { updateUser: updateUser },
      { id: user.id, password: password },
    );
  },
);
