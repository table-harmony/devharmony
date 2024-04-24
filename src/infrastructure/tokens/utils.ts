import { TokenEntity } from "./entity";
import { CreateTokenDto, TokenDto } from "./types";

export function tokenToDto(tokenEntity: TokenEntity): TokenDto {
  const { id, email, token, type, expires } = tokenEntity.getData();

  if (!id || !email || !token || !expires) throw new Error(" token expected data");

  return {
    id: id,
    email: email,
    token: token,
    type: type,
    expires: expires,
  };
}

export function tokenToCreateDto(token: TokenEntity): CreateTokenDto {
  const email = token.getEmail();

  if (!email) throw new Error(" token expected email");

  return {
    email: email,
    token: token.getToken(),
    type: token.getType(),
    expires: token.getExpires(),
  };
}

//export const generateDefaultVerificationToken = () => uuidv4();
//export const generateDefaultVerificationTokenExpiration = () => new Date(Date.now() + 3600 * 1000);
