import { TokenType } from "./types";

export class TokenEntity {
  private id?: string;
  private email: string;
  private token?: string;
  private type: TokenType;
  private expires?: Date;

  constructor({
    id,
    email,
    token,
    type,
    expires,
  }: {
    id?: string;
    email: string;
    token?: string;
    type: TokenType;
    expires?: Date;
  }) {
    this.id = id;
    this.email = email;
    this.token = token;
    this.type = type;
    this.expires = expires;
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

  getType() {
    return this.type;
  }

  getData() {
    return {
      id: this.id,
      email: this.email,
      token: this.token,
      type: this.type,
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
