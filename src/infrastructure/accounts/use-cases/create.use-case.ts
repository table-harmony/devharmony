import { CreateAccount, CreateAccountDto } from "../types";

export async function createAccountUseCase(
  context: { createAccount: CreateAccount },
  data: CreateAccountDto
) {
  const account = await context.createAccount(data);
  return account;
}
