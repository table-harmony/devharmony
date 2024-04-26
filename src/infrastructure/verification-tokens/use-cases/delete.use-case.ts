import {
  DeleteVerificationToken,
  DeleteVerificationTokenByEmail,
} from "../types";

export async function deleteVerificationTokenUseCase(
  context: {
    deleteToken: DeleteVerificationToken;
  },
  data: { id: string }
) {
  try {
    await context.deleteToken(data.id);
  } catch (error) {
    console.log("[DELETE_VERIFICATION_TOKEN_USE_CASE]: ERROR", error);
  }
}

export async function deleteVerificationTokenByEmailUseCase(
  context: {
    deleteTokenByEmail: DeleteVerificationTokenByEmail;
  },
  data: { email: string }
) {
  try {
    await context.deleteTokenByEmail(data.email);
  } catch (error) {
    console.log("[DELETE_VERIFICATION_TOKEN_BY_EMAIL_USE_CASE]: ERROR", error);
  }
}
