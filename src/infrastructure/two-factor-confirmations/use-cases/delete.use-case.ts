import { DeleteTwoFactorConfirmation, DeleteTwoFactorConfirmationByUser } from "../types";

export async function deleteTwoFactorConfirmationUseCase(
  context: {
    deleteTwoFactorConfirmation: DeleteTwoFactorConfirmation;
  },
  data: { id: string }
) {
  try {
    await context.deleteTwoFactorConfirmation(data.id);
  } catch (error) {
    console.log("[DELETE_TWO_FACTOR_CONFIRMATION_USE_CASE]: ERROR", error);
  }
}

export async function deleteTwoFactorConfirmationByUserUseCase(
  context: {
    deleteTwoFactorConfirmationByUser: DeleteTwoFactorConfirmationByUser;
  },
  data: { userId: string }
) {
  try {
    await context.deleteTwoFactorConfirmationByUser(data.userId);
  } catch (error) {
    console.log("[DELETE_TWO_FACTOR_CONFIRMATION_USE_CASE]: ERROR", error);
  }
}
