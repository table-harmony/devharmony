import { ColumnDef } from "@tanstack/react-table";
import {
  account,
  token,
  two_factor_confirmation,
  user,
} from "./_components/columns";
import {
  getUsers,
  getAccounts,
  getPasswordResetTokens,
  getTwoFactorTokens,
  getVerificationTokens,
  getTwoFactorConfirmations,
} from "@/data-access";
import type {
  AccountDto,
  TokenDto,
  TwoFactorConfirmationDto,
  UserDto,
} from "@/use-cases";
import {
  getUsersUseCase,
  getAccountsUseCase,
  getTokensUseCase,
  getTwoFactorConfirmationsUseCase,
} from "@/use-cases";

export interface Model<TData> {
  name: string;
  description: string;
  columns: ColumnDef<TData>[];
  getData: () => Promise<TData[]>;
}

export interface Models {
  user: Model<UserDto>;
  account: Model<AccountDto>;
  verification_token: Model<TokenDto>;
  two_factor_token: Model<TokenDto>;
  password_reset_token: Model<TokenDto>;
  two_factor_confirmation: Model<TwoFactorConfirmationDto>;
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
  verification_token: {
    name: "Verification Tokens",
    description:
      "Manage tokens used for verification purposes and view their details.",
    columns: token,
    getData: async () =>
      await getTokensUseCase({ getTokens: getVerificationTokens }),
  },
  two_factor_token: {
    name: "Two factor tokens",
    description:
      "Manage tokens for two-factor authentication and access their details.",
    columns: token,
    getData: async () =>
      await getTokensUseCase({ getTokens: getTwoFactorTokens }),
  },
  password_reset_token: {
    name: "Password reset tokens",
    description:
      "Manage tokens used for resetting passwords purposes and view their details.",
    columns: token,
    getData: async () =>
      await getTokensUseCase({ getTokens: getPasswordResetTokens }),
  },
  two_factor_confirmation: {
    name: "Two factor confirmations",
    description:
      "Handle confirmations for two-factor authentication and view their details.",
    columns: two_factor_confirmation,
    getData: async () =>
      await getTwoFactorConfirmationsUseCase({
        getTwoFactorConfirmations: getTwoFactorConfirmations,
      }),
  },
};
