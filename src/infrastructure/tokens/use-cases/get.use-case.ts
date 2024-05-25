import { GetTokenByEmail, GetTokenByToken } from "../types";

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
