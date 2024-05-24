import { UserRole } from "./types";

export class UserEntity {
  private id: string;
  private username: string | null;
  private email: string;
  private emailVerified: Date | null;
  private password: string | null;
  private salt: string | null;
  private image: string | null;
  private role: UserRole;

  constructor({
    id,
    username,
    email,
    emailVerified,
    password,
    salt,
    image,
    role,
  }: {
    id: string;
    username: string | null;
    email: string;
    emailVerified: Date | null;
    password: string | null;
    salt: string | null;
    image: string | null;
    role: UserRole;
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.emailVerified = emailVerified;
    this.password = password;
    this.salt = salt;
    this.image = image;
    this.role = role;
  }

  getId() {
    return this.id;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  getEmailVerified() {
    return this.emailVerified;
  }

  getPassword() {
    return this.password;
  }

  getSalt() {
    return this.salt;
  }

  getImage() {
    return this.image;
  }

  getRole() {
    return this.role;
  }

  toDto() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      emailVerified: this.emailVerified,
      password: this.password,
      salt: this.salt,
      image: this.image,
      role: this.role,
    };
  }
}
