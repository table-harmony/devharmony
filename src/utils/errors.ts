export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const AUTHENTICATION_ERROR_MESSAGE =
  "You must be logged in to view this content";

export class AuthenticationError extends PublicError {
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE);
    this.name = "AuthenticationError";
  }
}

export const AUTHORIZATION_ERROR_MESSAGE =
  "You are not authorized to view this content";

export class AuthorizationError extends PublicError {
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE);
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends PublicError {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export const RATE_LIMIT_ERROR = "Rate limit exceeded";

export class RateLimitError extends PublicError {
  constructor() {
    super(RATE_LIMIT_ERROR);
    this.name = "RateLimitError";
  }
}
