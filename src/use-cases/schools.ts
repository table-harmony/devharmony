import {
  createSchool,
  deleteSchool,
  getUserSchools,
  searchSchools,
} from "@/data-access/schools";
import { AuthorizationError } from "@/utils/errors";

export async function searchSchoolsUseCase(
  search: string,
  page: number,
  perPage: number,
) {
  return await searchSchools(search, page, perPage);
}

export async function createSchoolUseCase(data: {
  creatorId: number;
  name: string;
  description?: string;
  isPublic?: boolean;
  info?: string;
}) {
  const school = await createSchool(data);
  return school;
}

export async function getUserSchoolsUseCase(userId: number) {
  return await getUserSchools(userId);
}

export async function deleteSchoolUseCase(schoolId: number, userId: number) {
  const schools = await getUserSchools(userId);

  if (!schools.some((school) => school.id === schoolId))
    throw new AuthorizationError();

  await deleteSchool(schoolId);
}
