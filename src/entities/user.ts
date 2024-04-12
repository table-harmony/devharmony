<<<<<<< HEAD
=======
import type { UserRole } from "@/use-cases";
>>>>>>> parent of 9ecaca5 (prettier)
import bcrypt from "bcryptjs";

export class UserEntity {
  private id?: number;
  private name?: string;
  private password?: string | null;
  private email?: string;
  private emailVerified?: Date | null;
  private image?: string;
  private roles?: string[];
  private isTwoFactorEnabled?: boolean;

  constructor({
    id,
    name,
    email,
    password,
    emailVerified,
    image,
    roles,
    isTwoFactorEnabled,
  }: {
    id?: number;
    name?: string;
    password?: string | null;
    email?: string;
    emailVerified?: Date | null;
    image?: string;
    roles?: string[];
    isTwoFactorEnabled?: boolean;
  }) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.emailVerified = emailVerified;
    this.image = image;
    this.roles = roles;
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

  getRoles() {
    return this.roles;
  }

  getIsTwoFactorEnabled() {
    return this.isTwoFactorEnabled;
  }

  async setPassword(password: string) {
    this.password = password;
    await this.encryptPassword();
  }

  verifyEmail() {
    this.emailVerified = new Date();
  }

  async encryptPassword() {
    if (!this.password) {
      throw new Error("Expected user to have a password");
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }

  toDto() {
    if (
      this.id === undefined ||
      this.name === undefined ||
      this.password === undefined ||
      this.email === undefined ||
      this.emailVerified === undefined ||
      this.image === undefined ||
      this.roles === undefined ||
      this.isTwoFactorEnabled === undefined
    )
      throw new Error("Expected user to have a data!");

    return {
      id: this.id,
      name: this.name,
      password: this.password,
      email: this.email,
      emailVerified: this.emailVerified,
      image: this.image,
      roles: this.roles,
      isTwoFactorEnabled: this.isTwoFactorEnabled,
    };
  }

  toUpdateDto() {
    if (this.id === undefined) throw new Error("Expected user to have a id!");

    return {
      id: this.id,
      name: this.name,
      password: this.password,
      email: this.email,
      emailVerified: this.emailVerified,
      image: this.image,
      roles: this.roles,
      isTwoFactorEnabled: this.isTwoFactorEnabled,
    };
  }

  toCreateDto() {
    if (this.name === undefined || !this.password || this.email === undefined)
      throw new Error("Expected user to have data!");

    return {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}
