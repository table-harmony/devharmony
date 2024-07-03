"use server";

import {
  deleteResetTokenUseCase,
  getResetTokenUseCase,
} from "@/infrastructure/reset-tokens";
import { getUserUseCase, updatePasswordUseCase } from "@/infrastructure/users";

import { z } from "zod";

import { unauthenticatedAction } from "@/lib/safe-action";

export const newPasswordAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      token: z.string(),
      password: z.string().min(5),
    }),
  )
  .handler(async ({ input }) => {
    const resetToken = await getResetTokenUseCase(input.token);

    if (!resetToken) throw new Error("Invalid token!");

    await deleteResetTokenUseCase(input.token);

    const user = await getUserUseCase(resetToken.userId);

    if (!user) throw new Error("User doesn't exist!");

    await updatePasswordUseCase(user.id, input.password);
  });
