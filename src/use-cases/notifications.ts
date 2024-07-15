import {
  deleteNotification,
  getNotifications,
  getUnreadNotifications,
  updateNotification,
} from "@/data-access/notifications";
import { Notification } from "@/db/schema";

export async function markAllNotificationsAsReadUseCase(userId: number) {
  const unreadNotifications = await getUnreadNotifications(userId);

  await Promise.all(
    unreadNotifications.map((notification) =>
      updateNotification(notification.id, {
        read: true,
      }),
    ),
  );
}

export async function getUnreadNotificationsUseCase(
  userId: number,
  limit?: number,
) {
  return await getUnreadNotifications(userId, limit);
}

export async function deleteNotificationsUseCase(notifications: number[]) {
  await Promise.all(
    notifications.map((notificationId) => deleteNotification(notificationId)),
  );
}

export async function deleteNotificationUseCase(notificationId: number) {
  await deleteNotification(notificationId);
}

export async function getNotificationsUseCase(userId: number) {
  const notifications = await getNotifications(userId);
  notifications.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return notifications;
}

export async function updateNotificationUseCase(
  notificationId: number,
  data: Partial<Notification>,
) {
  await updateNotification(notificationId, data);
}
