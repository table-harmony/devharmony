import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { Account, accounts } from "@/db/schema";

import type { AccountDto } from "@/use-cases";

export function toAccountDtoMapper(account: Account): AccountDto {
  return {
    userId: account.userId,
    type: account.type,
    provider: account.provider,
    providerAccountId: account.providerAccountId,
    refresh_token: account.refresh_token,
    access_token: account.access_token,
    expires_at: account.expires_at,
    token_type: account.token_type,
    scope: account.scope,
    id_token: account.id_token,
    session_state: account.session_state,
  };
}

export async function getAccountByUser(
  userId: number
): Promise<AccountDto | undefined> {
  const foundAccount = await db.query.accounts.findFirst({
    where: eq(accounts.userId, userId),
  });

  if (!foundAccount) return undefined;

  return toAccountDtoMapper(foundAccount);
}

export async function getAccounts(): Promise<AccountDto[]> {
  const accounts = await db.query.accounts.findMany();

  return accounts.map(toAccountDtoMapper);
}
