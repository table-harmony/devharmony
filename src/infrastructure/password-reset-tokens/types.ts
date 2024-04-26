export type PasswordResetTokenDto = {
  id: string;
  email: string;
  token: string;
  expires: Date;
};

export type CreatePasswordResetTokenDto = {
  email: string;
  token: string;
  expires: Date;
};

export type CreatePasswordResetToken = (
  token: CreatePasswordResetTokenDto
) => Promise<void>;
export type GetPasswordResetTokenByToken = (
  token: string
) => Promise<PasswordResetTokenDto>;
export type GetPasswordResetTokenByEmail = (
  email: string
) => Promise<PasswordResetTokenDto | undefined>;
export type GetPasswordResetTokens = () => Promise<PasswordResetTokenDto[]>;
export type DeletePasswordResetToken = (id: string) => Promise<void>;
export type DeletePasswordResetTokenByEmail = (email: string) => Promise<void>;
