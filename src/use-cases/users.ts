import { createTransaction } from "@/data-access/utils";
import {
  createGoogleUser,
  createUser,
  deleteUser,
  getUserByEmail,
  GoogleUser,
  updatePassword,
  updateUser,
  User,
  verifyPassword,
} from "@/data-access/users";
import {
  deleteVerificationToken,
  getVerificationToken,
} from "@/data-access/verification-tokens";
import {
  createPasswordResetToken,
  deletePasswordResetToken,
  getPasswordResetToken,
} from "@/data-access/reset-tokens";

import { PublicError } from "@/utils/errors";

export async function deleteUserUseCase(userId: number) {
  await deleteUser(userId);
}

export async function getUserByCredentialsUseCase(
  email: string,
  password: string,
) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new PublicError("A user with that email doesn't exist");
  }

  const passwordsMatch = await verifyPassword(email, password);

  if (!passwordsMatch) {
    throw new PublicError("Incorrect credentials");
  }

  return user;
}

export async function createUserUseCase(email: string, password: string) {
  const existingUser = await getUserByEmail(email);

  if (existingUser)
    throw new PublicError("A user with that email already exists");

  const user = await createUser(email, password);

  return user;
}

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (!existingUser) {
    existingUser = await createGoogleUser(googleUser);
  }

  return existingUser;
}

export async function resetPasswordUseCase(token: string, password: string) {
  const resetToken = await getPasswordResetToken(token);

  if (!resetToken) {
    throw new PublicError("Invalid token");
  }

  if (resetToken.expiresAt.getTime() < Date.now()) {
    throw new PublicError("Expired token");
  }

  await createTransaction(async (trx) => {
    await deletePasswordResetToken(token, trx);
    await updatePassword(resetToken.userId, password);
  });
}

export async function forgotPasswordUseCase(email: string) {
  const user = await getUserByEmail(email);

  if (!user) throw new PublicError("A user with that email doesn't exist!");

  const token = await createPasswordResetToken(user.id);

  return token;
}

export async function verifyEmailUseCase(token: string) {
  const verification = await getVerificationToken(token);

  if (!verification) {
    throw new PublicError("Invalid token");
  }

  const userId = verification.userId;

  await createTransaction(async (trx) => {
    await updateUser(userId, { emailVerified: new Date() }, trx);
    await deleteVerificationToken(token, trx);
  });

  return userId;
}

export async function updateUserUseCase(userId: number, data: Partial<User>) {
  await updateUser(userId, data);
}

export async function updatePasswordUseCase(userId: number, password: string) {
  await updatePassword(userId, password);
}
