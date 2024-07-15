import "server-only";

import { db } from "@/db";
import { teachers } from "@/db/schema";

import { eq } from "drizzle-orm";

export async function getTeacherSchools(userId: number) {
  const data = await db.query.teachers.findMany({
    where: eq(teachers.userId, userId),
    with: {
      school: { with: { teachers: true, students: true } },
    },
  });

  return data.map((row) => row.school);
}
