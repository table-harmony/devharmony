import "server-only";

import { db } from "@/db";
import { Account, accounts } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { AccountDto } from "../types";

export function toDtoMapper(account: Account): AccountDto {
  return {
    id: account.id,
    type: account.type,
    userId: account.userId,
  };
}

export async function getAccount(id: string): Promise<AccountDto | undefined> {
  const foundAccount = await db.query.accounts.findFirst({
    where: eq(accounts.id, id),
  });

  if (!foundAccount) return undefined;

  return toDtoMapper(foundAccount);
}

export async function getAccounts(): Promise<AccountDto[]> {
  const accounts = await db.query.accounts.findMany();

  return accounts.map(toDtoMapper);
}
