import { v4 as uuidv4 } from "uuid";

import { PasswordResetTokenEntity } from "./entity";
import { CreatePasswordResetTokenDto, PasswordResetTokenDto } from "./types";

export function passwordResetTokenToDto(
  tokenEntity: PasswordResetTokenEntity
): PasswordResetTokenDto {
  const { id, email, token, expires } = tokenEntity.getData();

  if (!id || !token || !expires)
    throw new Error("Password reset token expected data");

  return {
    id: id,
    email: email,
    token: token,
    expires: expires,
  };
}

export function passwordResetTokenToCreateDto(
  token: PasswordResetTokenEntity
): CreatePasswordResetTokenDto {
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
