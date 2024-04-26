export type VerificationTokenDto = {
  id: string;
  email: string;
  token: string;
  expires: Date;
};

export type CreateVerificationTokenDto = {
  email: string;
  token: string;
  expires: Date;
};

export type CreateVerificationToken = (
  token: CreateVerificationTokenDto
) => Promise<void>;
export type GetVerificationTokenByToken = (
  token: string
) => Promise<VerificationTokenDto>;
export type GetVerificationTokenByEmail = (
  email: string
) => Promise<VerificationTokenDto | undefined>;
export type GetVerificationTokens = () => Promise<VerificationTokenDto[]>;
export type DeleteVerificationToken = (id: string) => Promise<void>;
export type DeleteVerificationTokenByEmail = (email: string) => Promise<void>;
