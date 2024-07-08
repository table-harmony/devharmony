"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { invalidateUserSessions } from "@/utils/session";

import { redirect } from "next/navigation";

export const invalidateUserSessionsAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    invalidateUserSessions(ctx.user.id);
    redirect("/");
  });
