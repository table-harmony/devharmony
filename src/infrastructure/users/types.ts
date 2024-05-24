import { UserRole } from "@/db/schema";

export type { UserRole };

export type CreateUserDto = {
  email: string;
  password: string;
  salt: string;
};

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

export type CreateUser = (data: CreateUserDto) => Promise<UserDto>;
export type GetUser = (userId: string) => Promise<UserDto>;
export type GetUserByEmail = (email: string) => Promise<UserDto | undefined>;
export type GetUsers = () => Promise<UserDto[]>;
export type DeleteUser = (userId: string) => Promise<void>;
