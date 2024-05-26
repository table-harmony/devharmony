import { DeleteExpiredTokens, DeleteToken, DeleteTokenByEmail } from "../types";

export async function deleteTokenUseCase(
  context: { deleteToken: DeleteToken },
  data: { id: string }
) {
  await context.deleteToken(data.id);
}

export async function deleteTokenByEmailUseCase(
  context: { deleteTokenByEmail: DeleteTokenByEmail },
  data: { email: string }
) {
  await context.deleteTokenByEmail(data.email);
}

export async function deleteExpiredTokensUseCase(context: {
  deleteExpiredTokens: DeleteExpiredTokens;
}) {
  await context.deleteExpiredTokens();
}
