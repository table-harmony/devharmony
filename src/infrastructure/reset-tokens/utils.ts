import crypto from "crypto";

export const TOKEN_LENGTH = 32;
export const TOKEN_EXPIRATION = 1000 * 60 * 5; // 5 min

export function generateRandomToken(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
