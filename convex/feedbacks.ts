import { ConvexError, v } from "convex/values";
import { internalMutation } from "./_generated/server";

import { getCurrentUser } from "./users";

export const createFeedback = internalMutation({
  args: {
    title: v.string(),
    label: v.string(),
    message: v.string(),
  },
  async handler(ctx, args) {
    const user = await getCurrentUser(ctx, {});

    if (!user)
      throw new ConvexError("User must be logged in to view this content");

    await ctx.db.insert("feedbacks", {
      userId: user._id,
      title: args.title,
      label: args.label,
      message: args.message,
    });
  },
});
