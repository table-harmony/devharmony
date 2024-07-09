"use server";

import { deleteUserUseCase } from "@/infrastructure/users";

import { redirect } from "next/navigation";

import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";
import { authenticatedAction } from "@/lib/safe-action";

export const deleteAccountAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    await deleteUserUseCase(ctx.user.id);
    redirect(DEFAULT_LOGIN_REDIRECT);
  });
