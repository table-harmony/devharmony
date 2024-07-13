"use server";

import { redirect } from "next/navigation";

import { authenticatedAction } from "@/lib/safe-action";
import { invalidateSession } from "@/utils/session";

export const logoutAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    await invalidateSession(ctx.session.id);
    redirect("/");
  });
