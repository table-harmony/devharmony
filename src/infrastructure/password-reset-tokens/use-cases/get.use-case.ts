import {
  GetPasswordResetTokenByEmail,
  PasswordResetTokenDto,
  GetPasswordResetTokenByToken,
  GetPasswordResetTokens,
} from "../types";

/**
 * @throws - throws an error if token was not found
 */
export async function getPasswordResetTokenByTokenUseCase(
  context: {
    getTokenByToken: GetPasswordResetTokenByToken;
  },
  data: { token: string }
): Promise<PasswordResetTokenDto> {
  const foundToken = await context.getTokenByToken(data.token);

  return foundToken;
}

export async function getPasswordResetTokenByEmailUseCase(
  context: {
    getTokenByEmail: GetPasswordResetTokenByEmail;
  },
  data: { email: string }
): Promise<PasswordResetTokenDto | undefined> {
  try {
    const foundToken = await context.getTokenByEmail(data.email);

    return foundToken;
  } catch (error) {
    console.log("[GET_PasswordReset_TOKEN_BY_EMAIL_USE_CASE]: ERROR", error);
  }
}

export async function getPasswordResetTokensUseCase(context: {
  getTokens: GetPasswordResetTokens;
}): Promise<PasswordResetTokenDto[]> {
  const foundTokens = await context.getTokens();

  return foundTokens;
}
