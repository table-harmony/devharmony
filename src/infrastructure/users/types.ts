import { UserRole } from "@/db/schema";

export type { UserRole };

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

export type UserDto = {
  id: string;
  name: string;
  password: string | null;
  email: string;
  image: string | null;
  role: UserRole;
};

export type CreateUser = (user: CreateUserDto) => Promise<void>;
export type DeleteUser = (userId: string) => Promise<void>;
export type GetUser = (userId: string) => Promise<UserDto>;
export type GetUsers = () => Promise<UserDto[]>;
export type GetUserByEmail = (email: string) => Promise<UserDto | undefined>;
