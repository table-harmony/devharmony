"use server";

import { createFeedbackUseCase } from "@/use-cases/feedbacks";
import { authenticatedAction } from "@/lib/safe-action";
import { sendEmail } from "@/lib/mail";

import { z } from "zod";

import { FeedbackEmail } from "@/components/emails/feedback";

export const sendFeedbackAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      title: z.string(),
      label: z.string(),
      message: z.string(),
    }),
  )
  .handler(async ({ input, ctx }) => {
    const feedback = await createFeedbackUseCase({
      userId: ctx.user.id,
      ...input,
    });

    await sendEmail(
      "tableharmony123@gmail.com",
      `Feedback from ${ctx.user.name}`,
      FeedbackEmail(feedback),
      ctx.user.email,
    );
  });
