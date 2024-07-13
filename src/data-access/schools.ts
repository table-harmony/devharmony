import "server-only";

import { db } from "@/db";
import { schools } from "@/db/schema";

import { and, eq, like, sql } from "drizzle-orm";

export async function searchSchools(
  search: string,
  page: number,
  perPage: number,
) {
  const condition = and(
    eq(schools.isPublic, true),
    like(schools.name, `%${search}%`),
  );

  const data = await db.query.schools.findMany({
    where: condition,
    with: {
      teachers: true,
      students: true,
    },
    limit: perPage,
    offset: (page - 1) * perPage,
  });

  const [numResults] = await db
    .select({
      count: sql`count(*)`.mapWith(Number).as("count"),
    })
    .from(schools)
    .where(condition);

  return {
    data,
    total: numResults.count,
    perPage,
  };
}

export async function createSchool(data: {
  creatorId: number;
  name: string;
  description?: string;
  isPublic?: boolean;
  info?: string;
}) {
  const school = await db.insert(schools).values(data).returning();
  return school;
}
