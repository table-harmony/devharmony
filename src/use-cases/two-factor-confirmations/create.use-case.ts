import type {
  CreateTwoFactorConfirmation,
  DeleteTwoFactorConfirmation,
  GetTwoFactorConfirmationByUser,
} from "@/use-cases";

import { TwoFactorConfirmationEntity } from "@/entities";

export async function createTwoFactorConfirmationUseCase(
  context: {
    getTwoFactorConfirmationByUser: GetTwoFactorConfirmationByUser;
    createTwoFactorConfirmation: CreateTwoFactorConfirmation;
    deleteTwoFactorConfirmation: DeleteTwoFactorConfirmation;
  },
  data: { userId: string }
): Promise<void> {
  try {
    const existingConfirmation = await context.getTwoFactorConfirmationByUser(
      data.userId
    );

    if (existingConfirmation) {
      await context.deleteTwoFactorConfirmation(existingConfirmation.id);
    }

    const confirmationEntity = new TwoFactorConfirmationEntity({
      userId: data.userId,
    });

    await context.createTwoFactorConfirmation(confirmationEntity.toCreateDto());
  } catch (error) {
    console.log("[CREATE_TWO_FACTOR_CONFIRMATION_USE_CASE]: ERROR", error);
  }
}
