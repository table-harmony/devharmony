"use server";

import {
  deleteUserUseCase,
  updatePasswordUseCase,
  updateUserUseCase,
} from "@/infrastructure/users";

import { z } from "zod";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

import { authenticatedAction } from "@/lib/safe-action";

export const updatePasswordAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      password: z.string().min(5),
    }),
  )
  .handler(async ({ input, ctx }) => {
    await updatePasswordUseCase(ctx.user.id, input.password);
  });

export const updateNameAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .handler(async ({ input, ctx }) => {
    await updateUserUseCase(ctx.user.id, { name: input.name });
    revalidateTag("user");
  });

export const deleteAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    await deleteUserUseCase(ctx.user.id);

    redirect("/");
  });
