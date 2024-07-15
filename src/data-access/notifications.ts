import "server-only";

import { db } from "@/db";
import { notifications, Notification } from "@/db/schema";

import { and, eq } from "drizzle-orm";

export async function createNotification(data: {
  userId: number;
  title: string;
}) {
  const [notification] = await db
    .insert(notifications)
    .values(data)
    .returning();

  return notification;
}

export async function updateNotification(
  notificationId: number,
  data: Partial<Notification>,
) {
  const [notification] = await db
    .update(notifications)
    .set(data)
    .where(eq(notifications.id, notificationId))
    .returning();

  return notification;
}

export async function getUnreadNotifications(userId: number, limit?: number) {
  return await db.query.notifications.findMany({
    where: and(eq(notifications.userId, userId), eq(notifications.read, false)),
    limit: limit,
  });
}

export async function getNotifications(userId: number) {
  return await db.query.notifications.findMany({
    where: and(eq(notifications.userId, userId)),
  });
}

export async function deleteNotification(notificationId: number) {
  await db.delete(notifications).where(eq(notifications.id, notificationId));
}
