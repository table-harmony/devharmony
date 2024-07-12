"use server";

import { resetPasswordUseCase } from "@/use-cases/users";

import { z } from "zod";

import { unauthenticatedAction } from "@/lib/safe-action";

export const resetPasswordAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      password: z.string().min(5),
      token: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    await resetPasswordUseCase(input.token, input.password);
  });
