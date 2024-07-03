import crypto from "crypto";

import { Token } from "./types";

export const TOKEN_LENGTH = 32;
export const TOKEN_EXPIRATION = 1000 * 60 * 5; // 5 min

export function generateRandomToken(length: number): Token {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
