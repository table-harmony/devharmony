import { getUsers, getUsersUseCase } from "@/infrastructure/users";
import { getAccounts, getAccountsUseCase } from "@/infrastructure/accounts";
import { getSessions, getSessionsUseCase } from "@/infrastructure/sessions";
import {
  getMagicLinkTokens,
  getTokensUseCase,
  getVerificationTokens,
} from "@/infrastructure/tokens";

import { ColumnDef } from "@tanstack/react-table";

import * as columns from "./_components/columns";

export interface Model<TData> {
  name: string;
  description: string;
  columns: ColumnDef<TData>[];
  getData: () => Promise<TData[]>;
}

export const models = {
  user: {
    name: "Users",
    description: "Effortlessly manage, edit, and delete user information.",
    columns: columns.user,
    getData: async () => await getUsersUseCase({ getUsers: getUsers }),
  },
  account: {
    name: "Accounts",
    description:
      "Oversee account details, including creation, modification, and deletion.",
    columns: columns.account,
    getData: async () => await getAccountsUseCase({ getAccounts: getAccounts }),
  },
  session: {
    name: "Sessions",
    description:
      "Monitor user sessions to ensure security and activity tracking.",
    columns: columns.session,
    getData: async () => await getSessionsUseCase({ getSessions: getSessions }),
  },
  verification_token: {
    name: "Verification tokens",
    description: "Handle verification tokens for user account confirmations.",
    columns: columns.verification_token,
    getData: async () =>
      await getTokensUseCase({ getTokens: getVerificationTokens }),
  },
  magic_link_token: {
    name: "Magic link tokens",
    description: "Manage magic link tokens for passwordless authentication.",
    columns: columns.magic_link_token,
    getData: async () =>
      await getTokensUseCase({ getTokens: getMagicLinkTokens }),
  },
};
