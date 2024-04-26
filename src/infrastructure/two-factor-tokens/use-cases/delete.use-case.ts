import { DeleteTwoFactorToken, DeleteTwoFactorTokenByEmail } from "../types";

export async function deleteTwoFactorTokenUseCase(
  context: {
    deleteToken: DeleteTwoFactorToken;
  },
  data: { id: string }
) {
  try {
    await context.deleteToken(data.id);
  } catch (error) {
    console.log("[DELETE_TWO_FACTOR_TOKEN_USE_CASE]: ERROR", error);
  }
}

export async function deleteTwoFactorTokenByEmailUseCase(
  context: {
    deleteTokenByEmail: DeleteTwoFactorTokenByEmail;
  },
  data: { email: string }
) {
  try {
    await context.deleteTokenByEmail(data.email);
  } catch (error) {
    console.log("[DELETE_TWO_FACTOR_TOKEN_BY_EMAIL_USE_CASE]: ERROR", error);
  }
}
