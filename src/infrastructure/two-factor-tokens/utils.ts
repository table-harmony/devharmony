import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { TwoFactorTokenEntity } from "./entity";
import { CreateTwoFactorTokenDto, TwoFactorTokenDto } from "./types";

export function twoFactorTokenToDto(
  tokenEntity: TwoFactorTokenEntity
): TwoFactorTokenDto {
  const { id, email, token, expires } = tokenEntity.getData();

  if (!id || !token || !expires)
    throw new Error("TwoFactor token expected data");

  return {
    id: id,
    email: email,
    token: token,
    expires: expires,
  };
}

export function twoFactorTokenToCreateDto(
  token: TwoFactorTokenEntity
): CreateTwoFactorTokenDto {
  return {
    email: token.getEmail(),
    token: token.getToken(),
    expires: token.getExpires(),
  };
}

export function generateDefaultTokenExpiration() {
  return new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
}

export function generateDefaultToken() {
  return crypto.randomInt(100_000, 1_000_000).toString();
}
