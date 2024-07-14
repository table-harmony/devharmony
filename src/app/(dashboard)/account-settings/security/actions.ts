"use server";

import { redirect } from "next/navigation";

import { authenticatedAction } from "@/lib/safe-action";
import { invalidateUserSessions } from "@/utils/session";

export const invalidateUserSessionsAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    await invalidateUserSessions(ctx.user.id);
    redirect("/");
  });
