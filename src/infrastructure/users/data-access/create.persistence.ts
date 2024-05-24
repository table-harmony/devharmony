import { db } from "@/db";
import { users } from "@/db/schema";

import { toDtoMapper } from "./get.persistence";
import { CreateUserDto, UserDto } from "../types";

export async function createUser(data: CreateUserDto): Promise<UserDto> {
  const [user] = await db
    .insert(users)
    .values({
      email: data.email,
      password: data.password,
      username: "Anonymus",
      salt: data.salt,
    })
    .returning();

  return toDtoMapper(user);
}
