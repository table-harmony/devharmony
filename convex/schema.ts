import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),
  notifications: defineTable({
    userId: v.id("users"),
    title: v.string(),
    isRead: v.boolean(),
  }).index("by_userId", ["userId"]),
  feedbacks: defineTable({
    userId: v.id("users"),
    title: v.string(),
    label: v.string(),
    message: v.string(),
  }),
});
