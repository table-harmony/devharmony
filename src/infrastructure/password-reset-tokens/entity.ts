import { generateDefaultToken, generateDefaultTokenExpiration } from "./utils";

export class PasswordResetTokenEntity {
  private id?: string;
  private email: string;
  private token: string;
  private expires: Date;

  constructor({
    id,
    email,
    token,
    expires,
  }: {
    id?: string;
    email: string;
    token?: string;
    expires?: Date;
  }) {
    this.id = id;
    this.email = email;
    this.token = token || generateDefaultToken();
    this.expires = expires || generateDefaultTokenExpiration();
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getToken() {
    return this.token;
  }

  getExpires() {
    return this.expires;
  }

  getData() {
    return {
      id: this.id,
      email: this.email,
      token: this.token,
      expires: this.expires,
    };
  }

  setExpires(expires: Date) {
    this.expires = expires;
  }

  setToken(token: string) {
    this.token = token;
  }
}
