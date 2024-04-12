import type { AccountDto, GetAccountByUser, GetAccounts } from "@/use-cases";

export async function getAccountByUserUseCase(
  context: {
    getAccountByUser: GetAccountByUser;
  },
  data: { userId: number }
): Promise<AccountDto | undefined> {
  try {
    const foundAccount = await context.getAccountByUser(data.userId);

    if (!foundAccount) return undefined;

    return foundAccount;
  } catch (error) {
    console.log("[GET_ACCOUNT_BY_USER_USE_CASE]: ERROR", error);
  }
}

export async function getAccountsUseCase(context: {
  getAccounts: GetAccounts;
}): Promise<AccountDto[]> {
  const foundAccounts = await context.getAccounts();

  return foundAccounts;
}
