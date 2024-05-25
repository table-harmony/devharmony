import { GetAccount } from "../types";

export async function getAccountUseCase(
  context: { getAccount: GetAccount },
  data: { id: string }
) {
  const foundAccount = await context.getAccount(data.id);
  return foundAccount;
}
