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

  toDto() {
    if (!this.id || !this.token || !this.expires)
      throw new Error("Expected token to have data!");

    return {
      id: this.id,
      email: this.email,
      token: this.token,
      expires: this.expires,
    };
  }

  toCreateDto() {
    return {
      email: this.email,
    };
  }
}
