import { GetTokenByEmail, GetTokenByToken, GetTokens, TokenDto } from "../types";

/**
 * @throws - throws an error if token was not found
 */
export async function getTokenByTokenUseCase(
  context: {
    getTokenByToken: GetTokenByToken;
  },
  data: { token: string }
): Promise<TokenDto> {
  const foundToken = await context.getTokenByToken(data.token);

  return foundToken;
}

export async function getTokenByEmailUseCase(
  context: {
    getTokenByEmail: GetTokenByEmail;
  },
  data: { email: string }
): Promise<TokenDto | undefined> {
  try {
    const foundToken = await context.getTokenByEmail(data.email);

    return foundToken;
  } catch (error) {
    console.log("[GET_TOKEN_BY_EMAIL_USE_CASE]: ERROR", error);
  }
}

export async function getTokensUseCase(context: { getTokens: GetTokens }): Promise<TokenDto[]> {
  const foundTokens = await context.getTokens();

  return foundTokens;
}
