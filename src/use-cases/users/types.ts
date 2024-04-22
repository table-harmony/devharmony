import { UserRole } from "@/entities";

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
  emailVerified: Date | null;
  image: string;
  role: UserRole;
  isTwoFactorEnabled: boolean;
};

export type UpdateUserDto = {
  id: string;
  name?: string;
  password?: string | null;
  email?: string;
  emailVerified?: Date | null;
  image?: string;
  role?: UserRole;
  isTwoFactorEnabled?: boolean;
};

export type CreateUser = (user: CreateUserDto) => Promise<void>;
export type DeleteUser = (userId: string) => Promise<void>;
export type UpdateUser = (user: UpdateUserDto) => Promise<void>;
export type GetUser = (userId: string) => Promise<UserDto>;
export type GetUsers = () => Promise<UserDto[]>;
export type GetUserByEmail = (email: string) => Promise<UserDto | undefined>;
