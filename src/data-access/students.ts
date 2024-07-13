import "server-only";

import { db } from "@/db";
import { students } from "@/db/schema";

import { eq } from "drizzle-orm";

export async function getStudentSchool(studentId: number) {
  const res = await db.query.students.findFirst({
    where: eq(students.userId, studentId),
    with: { school: { with: { teachers: true, students: true } } },
  });

  return res?.school;
}
