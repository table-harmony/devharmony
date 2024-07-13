import "server-only";

import { db } from "@/db";
import { teachers } from "@/db/schema";

import { eq } from "drizzle-orm";

export async function getTeacherSchools(teacherId: number) {
  const res = await db.query.teachers.findMany({
    where: eq(teachers.userId, teacherId),
    with: { school: { with: { teachers: true, students: true } } },
  });

  return res.map((item) => item.school);
}
