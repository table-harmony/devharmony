import { UserEntity } from "./entity";
import { CreateUserDto, UserDto } from "./types";

export function userToDto(user: UserEntity): UserDto {
  const { id, name, password, email, image, role } = user.getData();

  if (!role) throw new Error("User expected data");

  return {
    id: id,
    name: name,
    password: password,
    email: email,
    image: image,
    role: role,
  };
}

export function userToCreateDto(user: UserEntity): CreateUserDto {
  const { id, email, name, password, image } = user.getData();

  if (!password) throw new Error("User expected password");

  return {
    id: id,
    name: name,
    password: password,
    email: email,
    image: image,
  };
}
