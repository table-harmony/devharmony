import { db } from "@/db";
import { accounts } from "@/db/schema";

import { toDtoMapper } from "./get.persistence";
import { AccountDto, CreateAccountDto } from "../types";

export async function createAccount(
  data: CreateAccountDto
): Promise<AccountDto> {
  const [account] = await db.insert(accounts).values(data).returning();

  return toDtoMapper(account);
}
