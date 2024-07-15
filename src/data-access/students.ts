import "server-only";

import { db } from "@/db";
import { students } from "@/db/schema";

import { eq } from "drizzle-orm";

export async function getStudentSchool(userId: number) {
  const data = await db.query.students.findFirst({
    where: eq(students.userId, userId),
    with: {
      school: { with: { teachers: true, students: true } },
    },
  });

  return data?.school;
}
