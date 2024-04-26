import {
  DeletePasswordResetToken,
  DeletePasswordResetTokenByEmail,
} from "../types";

export async function deletePasswordResetTokenUseCase(
  context: {
    deleteToken: DeletePasswordResetToken;
  },
  data: { id: string }
) {
  try {
    await context.deleteToken(data.id);
  } catch (error) {
    console.log("[DELETE_PASSWORD_RESET_TOKEN_USE_CASE]: ERROR", error);
  }
}

export async function deletePasswordResetTokenByEmailUseCase(
  context: {
    deleteTokenByEmail: DeletePasswordResetTokenByEmail;
  },
  data: { email: string }
) {
  try {
    await context.deleteTokenByEmail(data.email);
  } catch (error) {
    console.log(
      "[DELETE_PASSWORD_RESET_TOKEN_BY_EMAIL_USE_CASE]: ERROR",
      error
    );
  }
}
