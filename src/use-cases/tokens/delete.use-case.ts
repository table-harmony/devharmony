import type { DeleteToken, DeleteTokenByEmail } from "@/use-cases";

export async function deleteTokenUseCase(
  context: {
    deleteToken: DeleteToken;
  },
  data: { id: string }
) {
  try {
    await context.deleteToken(data.id);
  } catch (error) {
    console.log("[DELETE_TOKEN_USE_CASE]: ERROR", error);
  }
}

export async function deleteTokenByEmailUseCase(
  context: {
    deleteTokenByEmail: DeleteTokenByEmail;
  },
  data: { email: string }
) {
  try {
    await context.deleteTokenByEmail(data.email);
  } catch (error) {
    console.log("[DELETE_TOKEN_BY_EMAIL_USE_CASE]: ERROR", error);
  }
}
