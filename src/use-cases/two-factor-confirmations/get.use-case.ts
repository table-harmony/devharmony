import type {
  GetTwoFactorConfirmationByUser,
  GetTwoFactorConfirmations,
  TwoFactorConfirmationDto,
} from "@/use-cases";

export async function getTwoFactorConfirmationByUserUseCase(
  context: {
    getTwoFactorConfirmationByUser: GetTwoFactorConfirmationByUser;
  },
  data: { userId: number }
): Promise<TwoFactorConfirmationDto | undefined> {
  try {
    const foundConfirmation = await context.getTwoFactorConfirmationByUser(
      data.userId
    );

    if (!foundConfirmation) return undefined;

    return foundConfirmation;
  } catch (error) {
    console.log("[GET_TWO_FACTOR_CONFIRMATION_USE_CASE]: ERROR", error);
  }
}

export async function getTwoFactorConfirmationsUseCase(context: {
  getTwoFactorConfirmations: GetTwoFactorConfirmations;
}): Promise<TwoFactorConfirmationDto[]> {
  const foundConfirmations = await context.getTwoFactorConfirmations();

  return foundConfirmations;
}
