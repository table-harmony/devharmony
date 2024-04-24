export type CreateTwoFactorConfirmationDto = {
  userId: string;
};

export type TwoFactorConfirmationDto = {
  id: string;
  userId: string;
};

export type GetTwoFactorConfirmation = (id: string) => Promise<TwoFactorConfirmationDto>;
export type GetTwoFactorConfirmations = () => Promise<TwoFactorConfirmationDto[]>;
export type GetTwoFactorConfirmationByUser = (
  userId: string
) => Promise<TwoFactorConfirmationDto | undefined>;
export type DeleteTwoFactorConfirmation = (id: string) => Promise<void>;
export type DeleteTwoFactorConfirmationByUser = (userId: string) => Promise<void>;
export type CreateTwoFactorConfirmation = (
  twoFactorConfirmation: CreateTwoFactorConfirmationDto
) => Promise<void>;
