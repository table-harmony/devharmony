"use server";

import { updatePasswordUseCase, updateUser } from "@/infrastructure/users";

import { authenticatedAction } from "@/lib/safe-action";
import { updatePasswordSchema } from "./validation";

export const updatePasswordAction = authenticatedAction(
  updatePasswordSchema,
  async ({ password }, { user }) => {
    await updatePasswordUseCase(
      { updateUser: updateUser },
      { id: user.id, password: password },
    );
  },
);
