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
import {
  getUsersUseCase,
  getAccountsUseCase,
  getTokensUseCase,
  getTwoFactorConfirmationsUseCase,
} from "@/use-cases";
import type { Models } from "@/types/models";

export const models: Models = {
  user: {
    name: "Users",
    description: "Manage users and view their data.",
    columns: user,
    getData: async () => await getUsersUseCase({ getUsers: getUsers }),
  },
  account: {
    name: "Accounts",
    description: "Manage accounts and view their data.",
    columns: account,
    getData: async () => await getAccountsUseCase({ getAccounts: getAccounts }),
  },
  verification_token: {
    name: "Verification Token",
    description: "Manage tokens and view their data.",
    columns: token,
    getData: async () =>
      await getTokensUseCase({ getTokens: getVerificationTokens }),
  },
  two_factor_token: {
    name: "Two Factor Token",
    description: "Manage tokens and view their data.",
    columns: token,
    getData: async () =>
      await getTokensUseCase({ getTokens: getTwoFactorTokens }),
  },
  password_reset_token: {
    name: "Password Reset Token",
    description: "Manage your users and view their data.",
    columns: token,
    getData: async () =>
      await getTokensUseCase({ getTokens: getPasswordResetTokens }),
  },
  two_factor_confirmation: {
    name: "Two Factor Confirmations",
    description: "Manage confirmations and view their data.",
    columns: two_factor_confirmation,
    getData: async () =>
      await getTwoFactorConfirmationsUseCase({
        getTwoFactorConfirmations: getTwoFactorConfirmations,
      }),
  },
};
