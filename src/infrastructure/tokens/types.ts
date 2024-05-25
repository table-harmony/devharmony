export type CreateTokenDto = {
  email: string;
  token: string;
  expiresAt: Date;
};

export type TokenDto = {
  id: string;
  email: string;
  token: string;
  expiresAt: Date;
};

export type CreateToken = (data: CreateTokenDto) => Promise<TokenDto>;
export type GetToken = (id: string) => Promise<TokenDto>;
export type GetTokenByToken = (token: string) => Promise<TokenDto>;
export type GetTokenByEmail = (email: string) => Promise<TokenDto | undefined>;
export type DeleteToken = (id: string) => Promise<void>;
export type DeleteTokenByEmail = (email: string) => Promise<void>;
