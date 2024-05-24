import crypto from "crypto";

const ITERATIONS = 10000;

export async function hashPassword(password: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      ITERATIONS,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString("hex"));
      }
    );
  });
}

export function generateSalt() {
  const salt = crypto.randomBytes(128).toString("base64");
  return salt;
}
