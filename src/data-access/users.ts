import "server-only";

import { db } from "@/db";
import { User, users } from "@/db/schema";

import { eq } from "drizzle-orm";
import crypto from "crypto";

const ITERATIONS = 10000;

export type GoogleUser = {
  email: string;
  name: string;
  googleId: string;
  picture: string;
};

export type { User };

async function hashPassword(plainTextPassword: string, salt: string) {
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

function generateSalt() {
  return crypto.randomBytes(128).toString("base64");
}

export async function deleteUser(userId: number) {
  await db.delete(users).where(eq(users.id, userId));
}

export async function getUser(userId: number) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
}

export async function createUser(email: string) {
  const [user] = await db
    .insert(users)
    .values({
      email,
    })
    .returning();

  return user;
}

export async function createCredentialsUser(email: string, password: string) {
  const salt = generateSalt();
  const hash = await hashPassword(password, salt);

  const [user] = await db
    .insert(users)
    .values({
      email,
      password: hash,
      salt,
    })
    .returning();

  return user;
}

export async function createGoogleUser(googleUser: GoogleUser) {
  const [user] = await db
    .insert(users)
    .values({ emailVerified: new Date(), ...googleUser })
    .returning();

  return user;
}

export async function verifyPassword(email: string, plainTextPassword: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    return false;
  }

  const salt = user.salt;
  const password = user.password;

  if (!salt || !password) {
    return false;
  }

  const hash = await hashPassword(plainTextPassword, salt);
  return user.password == hash;
}

export async function updateUser(
  userId: number,
  data: Partial<User>,
  trx = db,
) {
  await trx.update(users).set(data).where(eq(users.id, userId));
}

export async function updatePassword(
  userId: number,
  password: string,
  trx = db,
) {
  const salt = generateSalt();
  const hash = await hashPassword(password, salt);

  await trx
    .update(users)
    .set({
      password: hash,
      salt,
    })
    .where(eq(users.id, userId));
}
