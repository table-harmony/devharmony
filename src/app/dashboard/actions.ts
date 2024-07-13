"use server";

import { createSchoolUseCase } from "@/use-cases/schools";

import { authenticatedAction } from "@/lib/safe-action";

import { z } from "zod";
import { revalidateTag } from "next/cache";

export const createSchoolAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      name: z.string(),
      isPublic: z.boolean(),
      description: z.string(),
    }),
  )
  .handler(async ({ input, ctx }) => {
    await createSchoolUseCase({ creatorId: ctx.user.id, ...input });
    revalidateTag("schools");
  });
