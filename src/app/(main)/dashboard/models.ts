import { ColumnDef } from "@tanstack/react-table";
import {
  account,
  two_factor_token,
  verification_token,
  password_reset_token,
  two_factor_confirmation,
  user,
} from "./_components/columns";
import { getUsers, getUsersUseCase, UserDto } from "@/infrastructure/users";
import {
  getAccounts,
  getAccountsUseCase,
  AccountDto,
} from "@/infrastructure/accounts";
import {
  getTwoFactorConfirmations,
  getTwoFactorConfirmationsUseCase,
  TwoFactorConfirmationDto,
} from "@/infrastructure/two-factor-confirmations";
import {
  PasswordResetTokenDto,
  getPasswordResetTokens,
  getPasswordResetTokensUseCase,
} from "@/infrastructure/password-reset-tokens";
import {
  TwoFactorTokenDto,
  getTwoFactorTokens,
  getTwoFactorTokensUseCase,
} from "@/infrastructure/two-factor-tokens";
import {
  VerificationTokenDto,
  getVerificationTokens,
  getVerificationTokensUseCase,
} from "@/infrastructure/verification-tokens";

export interface Model<TData> {
  name: string;
  description: string;
  columns: ColumnDef<TData>[];
  getData: () => Promise<TData[]>;
}

export interface Models {
  user: Model<UserDto>;
  account: Model<AccountDto>;
  verification_token: Model<VerificationTokenDto>;
  two_factor_token: Model<TwoFactorTokenDto>;
  password_reset_token: Model<PasswordResetTokenDto>;
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
    name: "Verification tokens",
    description: "Manage tokens used for purposes and view their details.",
    columns: verification_token,
    getData: async () =>
      await getVerificationTokensUseCase({ getTokens: getVerificationTokens }),
  },
  password_reset_token: {
    name: "Password reset token",
    description: "Manage tokens used for purposes and view their details.",
    columns: password_reset_token,
    getData: async () =>
      await getPasswordResetTokensUseCase({
        getTokens: getPasswordResetTokens,
      }),
  },
  two_factor_token: {
    name: "Two factor token",
    description: "Manage tokens used for purposes and view their details.",
    columns: two_factor_token,
    getData: async () =>
      await getTwoFactorTokensUseCase({ getTokens: getTwoFactorTokens }),
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
