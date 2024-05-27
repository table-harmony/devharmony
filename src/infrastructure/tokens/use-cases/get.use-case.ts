import { GetTokenByEmail, GetTokenByToken, GetTokens } from "../types";

export async function getTokenByTokenUseCase(
  context: {
    getTokenByToken: GetTokenByToken;
  },
  data: { token: string }
) {
  const foundToken = await context.getTokenByToken(data.token);
  return foundToken;
}

export async function getTokenByEmailUseCase(
  context: { getTokenByEmail: GetTokenByEmail },
  data: { email: string }
) {
  const foundToken = await context.getTokenByEmail(data.email);
  return foundToken;
}

export async function getTokensUseCase(context: { getTokens: GetTokens }) {
  const tokens = await context.getTokens();
  return tokens;
}
