import {
  GetVerificationTokenByEmail,
  VerificationTokenDto,
  GetVerificationTokenByToken,
  GetVerificationTokens,
} from "../types";

/**
 * @throws - throws an error if token was not found
 */
export async function getVerificationTokenByTokenUseCase(
  context: {
    getTokenByToken: GetVerificationTokenByToken;
  },
  data: { token: string }
): Promise<VerificationTokenDto> {
  const foundToken = await context.getTokenByToken(data.token);

  return foundToken;
}

export async function getVerificationTokenByEmailUseCase(
  context: {
    getTokenByEmail: GetVerificationTokenByEmail;
  },
  data: { email: string }
): Promise<VerificationTokenDto | undefined> {
  try {
    const foundToken = await context.getTokenByEmail(data.email);

    return foundToken;
  } catch (error) {
    console.log("[GET_VERIFICATION_TOKEN_BY_EMAIL_USE_CASE]: ERROR", error);
  }
}

export async function getVerificationTokensUseCase(context: {
  getTokens: GetVerificationTokens;
}): Promise<VerificationTokenDto[]> {
  const foundTokens = await context.getTokens();

  return foundTokens;
}
