import { ColumnDef } from "@tanstack/react-table";
import { account, user } from "./_components/columns";
import { getUsers, getUsersUseCase, UserDto } from "@/infrastructure/users";
import {
  getAccounts,
  getAccountsUseCase,
  AccountDto,
} from "@/infrastructure/accounts";

export interface Model<TData> {
  name: string;
  description: string;
  columns: ColumnDef<TData>[];
  getData: () => Promise<TData[]>;
}

export interface Models {
  user: Model<UserDto>;
  account: Model<AccountDto>;
}

export const models: Models = {
  user: {
    name: "Users",
    description: "Effortlessly manage, edit, and delete user information.",
    columns: user,
    getData: async () => await getUsersUseCase({ getUsers: getUsers }),
  },
  account: {
    name: "Accounts",
    description: "Conveniently manage accounts and access their data.",
    columns: account,
    getData: async () => await getAccountsUseCase({ getAccounts: getAccounts }),
  },
};
