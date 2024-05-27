import { GetAccount, GetAccounts } from "../types";

export async function getAccountUseCase(
  context: { getAccount: GetAccount },
  data: { id: string }
) {
  const foundAccount = await context.getAccount(data.id);
  return foundAccount;
}

export async function getAccountsUseCase(context: {
  getAccounts: GetAccounts;
}) {
  const accounts = await context.getAccounts();
  return accounts;
}
