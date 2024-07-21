import { internalMutation, internalQuery } from "./_generated/server";
import { ConvexError, v } from "convex/values";

import { getCurrentUser, getUser } from "./users";

export const createNotification = internalMutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
  },
  async handler(ctx, args) {
    const user = await getUser(ctx, { userId: args.userId });

    if (!user) throw new ConvexError("Could not find user");

    await ctx.db.insert("notifications", {
      userId: user._id,
      title: args.title,
      isRead: false,
    });
  },
});

export const getUserNotifications = internalQuery({
  args: {
    title: v.string(),
  },
  async handler(ctx, args) {
    const user = await getCurrentUser(ctx, {});

    if (!user) return null;

    //TODO: collect notifications
  },
});

export const updateNotification = internalMutation({
  args: {
    notificationId: v.id("notifications"),
    isRead: v.boolean(),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.notificationId, {
      isRead: args.isRead,
    });
  },
});
