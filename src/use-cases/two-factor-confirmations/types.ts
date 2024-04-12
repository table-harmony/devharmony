export type CreateTwoFactorConfirmationDto = {
  userId: number;
};

export type TwoFactorConfirmationDto = {
  id: number;
  userId: number;
};

export type GetTwoFactorConfirmation = (
  id: number
) => Promise<TwoFactorConfirmationDto>;
export type GetTwoFactorConfirmations = () => Promise<
  TwoFactorConfirmationDto[]
>;
export type GetTwoFactorConfirmationByUser = (
  userId: number
) => Promise<TwoFactorConfirmationDto | undefined>;
export type DeleteTwoFactorConfirmation = (id: number) => Promise<void>;
export type DeleteTwoFactorConfirmationByUser = (
  userId: number
) => Promise<void>;
export type CreateTwoFactorConfirmation = (
  twoFactorConfirmation: CreateTwoFactorConfirmationDto
) => Promise<void>;
