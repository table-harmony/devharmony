import { ActionError } from "@/lib/safe-action";

import crypto from "crypto";
import { UserEntity } from "./entity";

const ITERATIONS = 10000;

export async function hashPassword(plainTextPassword: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      plainTextPassword,
      salt,
      ITERATIONS,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString("hex"));
      },
    );
  });
}

export function generateSalt() {
  const salt = crypto.randomBytes(128).toString("base64");
  return salt;
}

export async function verifyPassword(
  user: UserEntity,
  plainTextPassword: string,
) {
  const hashedPassword = user.getPassword();
  const salt = user.getSalt();

  if (!hashedPassword || !salt)
    throw new ActionError("This account does not have a password!");

  const hash = await hashPassword(plainTextPassword, salt);

  return hashedPassword === hash;
}
