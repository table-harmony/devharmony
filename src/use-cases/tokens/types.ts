export type TokenDto = {
  id: number;
  email: string;
  token: string;
  expires: Date;
};

export type CreateTokenDto = {
  email: string;
};

export type CreateToken = (token: CreateTokenDto) => Promise<void>;
export type GetTokenByToken = (token: string) => Promise<TokenDto>;
export type GetTokenByEmail = (email: string) => Promise<TokenDto | undefined>;
export type GetTokens = () => Promise<TokenDto[]>;
export type DeleteToken = (id: number) => Promise<void>;
export type DeleteTokenByEmail = (email: string) => Promise<void>;
