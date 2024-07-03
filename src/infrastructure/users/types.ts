import { User } from "@/db/schema";

export type { User };

export type UserId = number;

type Credentials = {
  email: string;
  password: string;
  salt: string;
};

type Google = {
  email: string;
  name: string;
  emailVerified: Date;
  googleId: string;
  picture: string;
};

export type CreateUserDto = Credentials | Google;
export type UpdateUserDto = Partial<Omit<User, "id">>;
