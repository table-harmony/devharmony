"use server";

import { redirect } from "next/navigation";

import { authenticatedAction } from "@/lib/safe-action";
import { invalidateSession } from "@/utils/session";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";

export const logoutAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    invalidateSession(ctx.session.id);
    redirect(DEFAULT_LOGIN_REDIRECT);
  });
