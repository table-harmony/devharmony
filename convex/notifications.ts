import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
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

export const getUserNotifications = query({
  async handler(ctx) {
    const user = await getCurrentUser(ctx, {});

    if (!user) return null;

    return await ctx.db
      .query("notifications")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const updateNotification = mutation({
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
