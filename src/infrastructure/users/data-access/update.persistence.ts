import "server-only";

import { db } from "@/db";
import { users } from "@/db/schema";

import { eq } from "drizzle-orm";

import type { UpdateUserDto, UserId } from "../types";
import { generateSalt, hashPassword } from "../utils";

export async function updateUser(
  userId: UserId,
  data: UpdateUserDto,
  trx = db,
) {
  await trx.update(users).set(data).where(eq(users.id, userId));
}

export async function updatePassword(
  userId: UserId,
  password: string,
  trx = db,
) {
  const salt = generateSalt();
  const hash = await hashPassword(password, salt);

  await trx
    .update(users)
    .set({
      password: hash,
      salt,
    })
    .where(eq(users.id, userId));
}
