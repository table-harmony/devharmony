export class TwoFactorConfirmationEntity {
  private id?: string;
  private userId: string;

  constructor({ id, userId }: { id?: string; userId: string }) {
    this.id = id;
    this.userId = userId;
  }

  getId() {
    return this.id;
  }

  getUserId() {
    return this.userId;
  }

  toDto() {
    if (!this.id) throw new Error("Expected token to have an id!");

    return {
      id: this.id,
      userId: this.userId,
    };
  }

  toCreateDto() {
    return {
      userId: this.userId,
    };
  }
}
