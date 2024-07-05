"use server";

import {
  createUserByCredentialsUseCase,
  deleteUserUseCase,
  updateUserUseCase,
} from "@/infrastructure/users";

import { z } from "zod";
import { revalidateTag } from "next/cache";

import { administratorAction } from "@/lib/safe-action";

export const createUserAction = administratorAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(5),
    }),
  )
  .handler(async ({ input }) => {
    await createUserByCredentialsUseCase(input);
    revalidateTag("data");
  });

export const editUserAction = administratorAction
  .createServerAction()
  .input(
    z.object({
      userId: z.number(),
      role: z.enum(["member", "manager", "admin"]),
    }),
  )
  .handler(async ({ input }) => {
    await updateUserUseCase(input.userId, { role: input.role });
    revalidateTag("data");
  });

export const deleteUserAction = administratorAction
  .createServerAction()
  .input(
    z.object({
      userId: z.number(),
    }),
  )
  .handler(async ({ input }) => {
    await deleteUserUseCase(input.userId);
    revalidateTag("data");
  });
