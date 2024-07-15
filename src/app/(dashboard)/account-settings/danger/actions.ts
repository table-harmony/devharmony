"use server";

import { deleteUserUseCase } from "@/use-cases/users";

import { redirect } from "next/navigation";

import { authenticatedAction } from "@/lib/safe-action";

export const deleteAccountAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    await deleteUserUseCase(ctx.user.id);
    redirect("/");
  });
