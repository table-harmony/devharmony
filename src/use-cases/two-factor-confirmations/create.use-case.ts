import { TwoFactorConfirmationEntity } from "@/entities";
import {
  CreateTwoFactorConfirmation,
  DeleteTwoFactorConfirmation,
  GetTwoFactorConfirmationByUser,
} from "./types";
import { TwoFactorConfirmationToCreateDto } from "./utils";

export async function createTwoFactorConfirmationUseCase(
  context: {
    getTwoFactorConfirmationByUser: GetTwoFactorConfirmationByUser;
    createTwoFactorConfirmation: CreateTwoFactorConfirmation;
    deleteTwoFactorConfirmation: DeleteTwoFactorConfirmation;
  },
  data: { userId: string }
) {
  try {
    const existingConfirmation = await context.getTwoFactorConfirmationByUser(
      data.userId
    );
    if (existingConfirmation)
      await context.deleteTwoFactorConfirmation(existingConfirmation.id);

    const confirmation = new TwoFactorConfirmationEntity({
      userId: data.userId,
    });

    await context.createTwoFactorConfirmation(
      TwoFactorConfirmationToCreateDto(confirmation)
    );
  } catch (error) {
    console.log("[CREATE_TWO_FACTOR_CONFIRMATION_USE_CASE]: ERROR", error);
  }
}
