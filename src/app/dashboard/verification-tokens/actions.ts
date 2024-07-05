"use server";

import { deleteVerificationByIdUseCase } from "@/infrastructure/verification-tokens";

import { z } from "zod";
import { revalidateTag } from "next/cache";

import { administratorAction } from "@/lib/safe-action";

export const deleteVerificationAction = administratorAction
  .createServerAction()
  .input(
    z.object({
      verificationId: z.number(),
    }),
  )
  .handler(async ({ input }) => {
    await deleteVerificationByIdUseCase(input.verificationId);
    revalidateTag("data");
  });
