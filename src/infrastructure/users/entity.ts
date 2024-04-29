import { UserRole } from "./types";

export class UserEntity {
  private id: string;
  private name: string;
  private password: string | null;
  private email: string;
  private image: string;
  private role?: UserRole;

  constructor({
    id,
    name,
    email,
    password,
    image,
    role,
  }: {
    id: string;
    name: string;
    password: string | null;
    email: string;
    image: string;
    role?: UserRole;
  }) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.image = image;
    this.role = role;
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

  getImage() {
    return this.image;
  }

  getRole() {
    return this.role;
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      password: this.password,
      email: this.email,
      image: this.image,
      role: this.role,
    };
  }

  setPassword(password: string) {
    this.password = password;
  }
}
