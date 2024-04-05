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

export const models = {
  user: {
    columns: user,
    getData: async () => await getUsersUseCase({ getUsers: getUsers }),
  },
  account: {
    columns: account,
    getData: async () => await getAccountsUseCase({ getAccounts: getAccounts }),
  },
  verification_token: {
    columns: token,
    getData: async () =>
      await getTokensUseCase({ getTokens: getVerificationTokens }),
  },
  two_factor_token: {
    columns: token,
    getData: async () =>
      await getTokensUseCase({ getTokens: getTwoFactorTokens }),
  },
  password_reset_token: {
    columns: token,
    getData: async () =>
      await getTokensUseCase({ getTokens: getPasswordResetTokens }),
  },
  two_factor_confirmation: {
    columns: two_factor_confirmation,
    getData: async () =>
      await getTwoFactorConfirmationsUseCase({
        getTwoFactorConfirmations: getTwoFactorConfirmations,
      }),
  },
};
