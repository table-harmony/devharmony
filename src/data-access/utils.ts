import { db } from "@/db";
import crypto from "crypto";

export const TOKEN_LENGTH = 32;
export const TOKEN_EXPIRATION = 1000 * 60 * 5; // 5 min

export async function generateRandomToken(length: number) {
  const buf = await new Promise<Buffer>((resolve, reject) => {
    crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });

  return buf.toString("hex").slice(0, length);
}

export async function createTransaction<T extends typeof db>(
  cb: (trx: T) => void,
) {
  await db.transaction(cb as any);
}
