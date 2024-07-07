"use server";

import { deleteSessionUseCase } from "@/infrastructure/sessions";

import { revalidateTag } from "next/cache";
import { z } from "zod";

import { administratorAction } from "@/lib/safe-action";
import { deleteSession } from "@/lib/session";

export const deleteSessionAction = administratorAction
  .createServerAction()
  .input(
    z.object({
      sessionId: z.string(),
    }),
  )
  .handler(async ({ ctx, input }) => {
    if (ctx.session.id === input.sessionId)
      await deleteSession(input.sessionId);
    else await deleteSessionUseCase(input.sessionId);

    revalidateTag("data");
  });