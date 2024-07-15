import { getStudentSchool } from "@/data-access/students";

export async function getStudentSchoolUseCase(userId: number) {
  return await getStudentSchool(userId);
}
