import { UserRole } from "@/db/schema";

export type { UserRole };

type Credentials = {
  email: string;
  password: string;
  salt: string;
};

type OAuth = {
  email: string;
  emailVerified: Date;
  username: string;
  image: string;
};

type MagicLink = {
  email: string;
  emailVerified: Date;
};

export type CreateUserDto = Credentials | OAuth | MagicLink;

export type UserDto = {
  id: string;
  username: string | null;
  email: string;
  emailVerified: Date | null;
  password: string | null;
  salt: string | null;
  image: string | null;
  role: UserRole;
};

export type UpdateUserDto = {
  username?: string;
  emailVerified?: Date;
  password?: string;
  salt?: string;
  image?: string;
  role?: UserRole;
};

export type CreateUser = (data: CreateUserDto) => Promise<UserDto>;
export type GetUser = (userId: string) => Promise<UserDto>;
export type GetUserByEmail = (email: string) => Promise<UserDto | undefined>;
export type GetUsers = () => Promise<UserDto[]>;
export type DeleteUser = (userId: string) => Promise<void>;
export type UpdateUser = (
  userId: string,
  data: UpdateUserDto
) => Promise<UserDto>;
