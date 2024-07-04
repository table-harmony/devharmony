"use server";

import {
  createUserByCredentialsUseCase,
  deleteUserUseCase,
  updateUserUseCase,
} from "@/infrastructure/users";

import { z } from "zod";
import { revalidatePath } from "next/cache";

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
    revalidatePath("users");
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
    revalidatePath("users");
  });
