import bcrypt from "bcryptjs";
import { UserEntity } from "@/entities";
import { CreateUserDto, UpdateUserDto, UserDto } from "./types";

export function userToDto(user: UserEntity): UserDto {
  const id = user.getId(),
    name = user.getName(),
    password = user.getPassword(),
    email = user.getEmail(),
    emailVerified = user.getEmailVerified(),
    image = user.getImage(),
    role = user.getRole(),
    isTwoFactorEnabled = user.getIsTwoFactorEnabled();

  if (
    !id ||
    !name ||
    password === undefined ||
    !email ||
    emailVerified === undefined ||
    !image ||
    !role ||
    isTwoFactorEnabled === undefined
  )
    throw new Error("User expected data");

  return {
    id: id,
    name: name,
    password: password,
    email: email,
    emailVerified: emailVerified,
    image: image,
    role: role,
    isTwoFactorEnabled: isTwoFactorEnabled,
  };
}

export function userToCreateDto(user: UserEntity): CreateUserDto {
  const name = user.getName(),
    password = user.getPassword(),
    email = user.getEmail(),
    image = user.getImage();

  if (!name || !password || !email) throw new Error("User expected data");

  return {
    name: name,
    password: password,
    email: email,
    image: image,
  };
}

export function userToUpdateDto(user: UserEntity): UpdateUserDto {
  const id = user.getId();

  if (!id) throw new Error("User expected id");

  return {
    id: id,
    name: user.getName(),
    password: user.getPassword(),
    email: user.getEmail(),
    emailVerified: user.getEmailVerified(),
    image: user.getImage(),
    role: user.getRole(),
    isTwoFactorEnabled: user.getIsTwoFactorEnabled(),
  };
}

export async function encryptUserPassword(user: UserEntity) {
  const password = user.getPassword();

  if (!password) throw new Error("User expected password");

  const hashedPassword = await bcrypt.hash(password, 10);

  user.setPassword(hashedPassword);
}

export async function compareStrings(str1: string, str2: string) {
  const stringMatch = await bcrypt.compare(str1, str2);

  return stringMatch;
}
