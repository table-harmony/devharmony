export type TwoFactorTokenDto = {
  id: string;
  email: string;
  token: string;
  expires: Date;
};

export type CreateTwoFactorTokenDto = {
  email: string;
  token: string;
  expires: Date;
};

export type CreateTwoFactorToken = (
  token: CreateTwoFactorTokenDto
) => Promise<void>;
export type GetTwoFactorTokenByToken = (
  token: string
) => Promise<TwoFactorTokenDto>;
export type GetTwoFactorTokenByEmail = (
  email: string
) => Promise<TwoFactorTokenDto | undefined>;
export type GetTwoFactorTokens = () => Promise<TwoFactorTokenDto[]>;
export type DeleteTwoFactorToken = (id: string) => Promise<void>;
export type DeleteTwoFactorTokenByEmail = (email: string) => Promise<void>;
