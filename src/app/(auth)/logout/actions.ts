"use server";

import { redirect } from "next/navigation";

import { authenticatedAction } from "@/lib/safe-action";
import { deleteSession } from "@/lib/session";

export const logoutAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    deleteSession(ctx.session.id);

    redirect("/");
  });
