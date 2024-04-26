import {
  GetTwoFactorTokenByEmail,
  TwoFactorTokenDto,
  GetTwoFactorTokenByToken,
  GetTwoFactorTokens,
} from "../types";

/**
 * @throws - throws an error if token was not found
 */
export async function getTwoFactorTokenByTokenUseCase(
  context: {
    getTokenByToken: GetTwoFactorTokenByToken;
  },
  data: { token: string }
): Promise<TwoFactorTokenDto> {
  const foundToken = await context.getTokenByToken(data.token);

  return foundToken;
}

export async function getTwoFactorTokenByEmailUseCase(
  context: {
    getTokenByEmail: GetTwoFactorTokenByEmail;
  },
  data: { email: string }
): Promise<TwoFactorTokenDto | undefined> {
  try {
    const foundToken = await context.getTokenByEmail(data.email);

    return foundToken;
  } catch (error) {
    console.log("[GET_TwoFactor_TOKEN_BY_EMAIL_USE_CASE]: ERROR", error);
  }
}

export async function getTwoFactorTokensUseCase(context: {
  getTokens: GetTwoFactorTokens;
}): Promise<TwoFactorTokenDto[]> {
  const foundTokens = await context.getTokens();

  return foundTokens;
}
