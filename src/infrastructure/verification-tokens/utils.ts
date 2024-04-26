import { v4 as uuidv4 } from "uuid";

import { VerificationTokenEntity } from "./entity";
import { CreateVerificationTokenDto, VerificationTokenDto } from "./types";

export function verificationTokenToDto(
  tokenEntity: VerificationTokenEntity
): VerificationTokenDto {
  const { id, email, token, expires } = tokenEntity.getData();

  if (!id || !token || !expires)
    throw new Error("Verification token expected data");

  return {
    id: id,
    email: email,
    token: token,
    expires: expires,
  };
}

export function verificationTokenToCreateDto(
  token: VerificationTokenEntity
): CreateVerificationTokenDto {
  return {
    email: token.getEmail(),
    token: token.getToken(),
    expires: token.getExpires(),
  };
}

export function generateDefaultTokenExpiration() {
  return new Date(Date.now() + 3600 * 1000); // 1 hour
}

export function generateDefaultToken() {
  return uuidv4();
}
