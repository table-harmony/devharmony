import { UserRole } from "@/db/schema";

export type { UserRole };

export class UserEntity {
  private id?: string;
  private name?: string;
  private password?: string | null;
  private email?: string;
  private emailVerified?: Date | null;
  private image?: string;
  private role?: UserRole;
  private isTwoFactorEnabled?: boolean;

  constructor({
    id,
    name,
    email,
    password,
    emailVerified,
    image,
    role,
    isTwoFactorEnabled,
  }: {
    id?: string;
    name?: string;
    password?: string | null;
    email?: string;
    emailVerified?: Date | null;
    image?: string;
    role?: UserRole;
    isTwoFactorEnabled?: boolean;
  }) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.emailVerified = emailVerified;
    this.image = image;
    this.role = role;
    this.isTwoFactorEnabled = isTwoFactorEnabled;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPassword() {
    return this.password;
  }

  getEmail() {
    return this.email;
  }

  getEmailVerified() {
    return this.emailVerified;
  }

  getImage() {
    return this.image;
  }

  getRole() {
    return this.role;
  }

  getIsTwoFactorEnabled() {
    return this.isTwoFactorEnabled;
  }

  setPassword(password: string) {
    this.password = password;
  }

  verifyEmail() {
    this.emailVerified = new Date();
  }
}
