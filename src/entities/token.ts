export class TokenEntity {
  private id?: string;
  private email: string;
  private token?: string;
  private expires?: Date;

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
    this.token = token;
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
}
