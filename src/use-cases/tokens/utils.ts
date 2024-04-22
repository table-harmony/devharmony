import { TokenEntity } from "@/entities";
import { CreateTokenDto, TokenDto } from "./types";

export function tokenToDto(token: TokenEntity): TokenDto {
  const id = token.getId(),
    email = token.getEmail(),
    tokn = token.getToken(),
    expires = token.getExpires();

  if (!id || !email || !tokn || !expires)
    throw new Error("Token expected data");

  return {
    id: id,
    email: email,
    token: tokn,
    expires: expires,
  };
}

export function tokenToCreateDto(token: TokenEntity): CreateTokenDto {
  const email = token.getEmail();

  if (!email) throw new Error("Token expected email");

  return {
    email: email,
    token: token.getToken(),
    expires: token.getExpires(),
  };
}
