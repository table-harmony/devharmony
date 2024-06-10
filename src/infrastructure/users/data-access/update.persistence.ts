import "server-only";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { UpdateUserDto, UserDto } from "../types";
import { toDtoMapper } from "./get.persistence";

export async function updateUser(
  id: string,
  data: UpdateUserDto,
): Promise<UserDto> {
  const [updatedUser] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();

  return toDtoMapper(updatedUser);
}
