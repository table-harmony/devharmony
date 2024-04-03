import type {
  DeleteTwoFactorConfirmation,
  DeleteTwoFactorConfirmationByUser,
} from "@/use-cases/two-factor-confirmations/types";

export async function deleteTwoFactorConfirmationUseCase(
  context: {
    deleteTwoFactorConfirmation: DeleteTwoFactorConfirmation;
  },
  data: { id: string }
): Promise<void> {
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
): Promise<void> {
  try {
    await context.deleteTwoFactorConfirmationByUser(data.userId);
  } catch (error) {
    console.log("[DELETE_TWO_FACTOR_CONFIRMATION_USE_CASE]: ERROR", error);
  }
}