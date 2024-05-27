import { AccountType } from "@/db/schema";

export type { AccountType };

export type CreateAccountDto = {
  id: string;
  type: AccountType;
  userId: string;
};

export type AccountDto = {
  id: string;
  type: AccountType;
  userId: string;
};

export type CreateAccount = (data: CreateAccountDto) => Promise<AccountDto>;
export type GetAccount = (id: string) => Promise<AccountDto | undefined>;
export type GetAccounts = () => Promise<AccountDto[]>;
