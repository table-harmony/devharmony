"use server";

import { authenticatedAction } from "@/lib/safe-action";
import {
  deleteNotificationsUseCase,
  deleteNotificationUseCase,
  updateNotificationUseCase,
} from "@/use-cases/notifications";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const deleteNotificationsAction = authenticatedAction
  .createServerAction()
  .input(z.object({ notificationIds: z.array(z.number()) }))
  .handler(async ({ input }) => {
    await deleteNotificationsUseCase(input.notificationIds);
    revalidateTag("data");
  });

export const deleteNotificationAction = authenticatedAction
  .createServerAction()
  .input(z.object({ notificationId: z.number() }))
  .handler(async ({ input }) => {
    await deleteNotificationUseCase(input.notificationId);
    revalidateTag("data");
  });

export const switchReadNotificationAction = authenticatedAction
  .createServerAction()
  .input(z.object({ notificationId: z.number(), isRead: z.boolean() }))
  .handler(async ({ input }) => {
    await updateNotificationUseCase(input.notificationId, {
      read: !input.isRead,
    });
    revalidateTag("data");
  });
