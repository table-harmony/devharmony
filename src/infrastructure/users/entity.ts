import { AccountType, UserRole } from "./types";

export class UserEntity {
  private id: string;
  private accountType: AccountType;
  private username: string | null;
  private email: string;
  private emailVerified: Date | null;
  private googleId: string | null;
  private githubId: string | null;
  private password: string | null;
  private salt: string | null;
  private image: string | null;
  private role: UserRole;

  constructor({
    id,
    accountType,
    username,
    email,
    emailVerified,
    githubId,
    googleId,
    password,
    salt,
    image,
    role,
  }: {
    id: string;
    accountType: AccountType;
    username: string | null;
    email: string;
    emailVerified: Date | null;
    googleId: string | null;
    githubId: string | null;
    password: string | null;
    salt: string | null;
    image: string | null;
    role: UserRole;
  }) {
    this.id = id;
    this.accountType = accountType;
    this.username = username;
    this.email = email;
    this.emailVerified = emailVerified;
    this.googleId = googleId;
    this.githubId = githubId;
    this.password = password;
    this.salt = salt;
    this.image = image;
    this.role = role;
  }

  getId() {
    return this.id;
  }

  getAccountType() {
    return this.accountType;
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

  getGoogleId() {
    return this.googleId;
  }

  getGithubId() {
    return this.githubId;
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
      accountType: this.accountType,
      username: this.username,
      email: this.email,
      emailVerified: this.emailVerified,
      googleId: this.googleId,
      githubId: this.githubId,
      password: this.password,
      salt: this.salt,
      image: this.image,
      role: this.role,
    };
  }
}
