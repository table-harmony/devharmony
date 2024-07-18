"use server";

import { createFeedbackUseCase } from "@/use-cases/feedbacks";
import { authenticatedAction } from "@/lib/safe-action";
import { sendEmail } from "@/lib/mail";

import { z } from "zod";

import { FeedbackEmail } from "@/components/emails/feedback";
import { revalidateTag } from "next/cache";
import { updateNotificationUseCase } from "@/use-cases/notifications";

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
    );
  });

export const markNotificationAsReadAction = authenticatedAction
  .createServerAction()
  .input(z.object({ notificationId: z.number() }))
  .handler(async ({ input, ctx }) => {
    await updateNotificationUseCase(input.notificationId, { read: true });
    revalidateTag("notifications");
  });
