"use server";

import { deleteUserUseCase } from "@/infrastructure/users";

import { authenticatedAction } from "@/lib/safe-action";
import { redirect } from "next/navigation";

export const deleteAccountAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    await deleteUserUseCase(ctx.user.id);
    redirect("/");
  });
