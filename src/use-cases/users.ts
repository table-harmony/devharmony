import { createTransaction } from "@/data-access/utils";
import {
  createCredentialsUser,
  createGoogleUser,
  createUser,
  deleteUser,
  getUser,
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
import {
  deleteMagicLink,
  getMagicLinkByToken,
} from "@/data-access/magic-links";

import { PublicError } from "@/utils/errors";
import { deleteFile, uploadFile } from "@/lib/files";

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

export async function getUserUseCase(userId: number) {
  return await getUser(userId);
}

export async function createCredentialsUserUseCase(
  email: string,
  password: string,
) {
  const existingUser = await getUserByEmail(email);

  if (existingUser)
    throw new PublicError("A user with that email already exists");

  const user = await createCredentialsUser(email, password);

  return user;
}

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (!existingUser) {
    existingUser = await createGoogleUser(googleUser);
  }

  return existingUser;
}

export async function magicUserUseCase(token: string) {
  const magicLink = await getMagicLinkByToken(token);

  if (!magicLink) throw new PublicError("Invalid token");

  if (magicLink.expiresAt.getTime() < Date.now())
    throw new PublicError("Expired token");

  await deleteMagicLink(token);

  let user = await getUserByEmail(magicLink.email);

  if (!user) user = await createUser(magicLink.email);

  await updateUser(user.id, { emailVerified: new Date() });

  return user.id;
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
    await updatePassword(resetToken.userId, password, trx);
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

export async function updateImageUseCase(userId: number, file: File) {
  const user = await getUser(userId);

  if (!user) throw new PublicError("User does not exist");

  if (!file.type.startsWith("image"))
    throw new PublicError("File must be an image");

  if (user.picture) await deleteFile(user.picture);

  const { url } = await uploadFile(`users/avatars/${user.id}`, file);
  await updateUser(user.id, { picture: url });
}
