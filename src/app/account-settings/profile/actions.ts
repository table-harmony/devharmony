"use server";

import {
  updatePasswordUseCase,
  updateUserUseCase,
} from "@/infrastructure/users";

import { authenticatedAction } from "@/lib/safe-action";

import { z } from "zod";
import { revalidateTag } from "next/cache";

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

export const updateBioAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      bio: z.string().max(999),
    }),
  )
  .handler(async ({ input, ctx }) => {
    await updateUserUseCase(ctx.user.id, { bio: input.bio });
    revalidateTag("user");
  });
