import {
  createSchool,
  getUserSchools,
  searchSchools,
} from "@/data-access/schools";

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
