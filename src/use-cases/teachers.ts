import { getTeacherSchools } from "@/data-access/teachers";

export async function getTeacherSchoolsUseCase(userId: number) {
  return await getTeacherSchools(userId);
}
