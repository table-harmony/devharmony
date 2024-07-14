import "server-only";

import { db } from "@/db";
import { feedbacks } from "@/db/schema";

export async function createFeedback(data: {
  userId: number;
  title: string;
  label?: string;
  message?: string;
}) {
  const [feedback] = await db.insert(feedbacks).values(data).returning();
  return feedback;
}
