export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
};

export type UserDto = {
  id: number;
  name: string;
  password: string | null;
  email: string;
  emailVerified: Date | null;
  image: string;
  roles: string[];
  isTwoFactorEnabled: boolean;
};

export type UpdateUserDto = {
  id: number;
  name?: string;
  password?: string | null;
  email?: string;
  emailVerified?: Date | null;
  image?: string;
  roles?: string[];
  isTwoFactorEnabled?: boolean;
};

export type CreateUser = (user: CreateUserDto) => Promise<void>;
export type DeleteUser = (userId: number) => Promise<void>;
export type UpdateUser = (user: UpdateUserDto) => Promise<void>;
export type GetUser = (userId: number) => Promise<UserDto>;
export type GetUsers = () => Promise<UserDto[]>;
export type GetUserByEmail = (email: string) => Promise<UserDto | undefined>;
