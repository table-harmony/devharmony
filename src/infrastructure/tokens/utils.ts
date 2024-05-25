import { randomUUID } from "crypto";

export function generateToken() {
  const token = randomUUID();
  return token;
}
