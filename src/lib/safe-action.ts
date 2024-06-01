import { DataAccessError, UsecaseError } from "@/infrastructure/utils";
import { validateRequest } from "@/lib/auth";
import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action";

export const unauthenticatedAction = createSafeActionClient({
  handleReturnedServerError(e) {
    if (
      e instanceof ActionError ||
      e instanceof UsecaseError ||
      e instanceof DataAccessError
    )
      return e.message;
    return DEFAULT_SERVER_ERROR;
  },
});

export const authenticatedAction = createSafeActionClient({
  async middleware() {
    const { user } = await validateRequest();

    if (!user) throw new ActionError("Session is invalid!");

    return { user };
  },
  handleReturnedServerError(e) {
    if (
      e instanceof ActionError ||
      e instanceof UsecaseError ||
      e instanceof DataAccessError
    )
      return e.message;
    return DEFAULT_SERVER_ERROR;
  },
});

export const privilegedAction = createSafeActionClient({
  async middleware() {
    const { user } = await validateRequest();

    if (!user) throw new ActionError("Session is invalid!");

    if (user.role === "member")
      throw new ActionError("User cannot perform this action!");

    return { user };
  },
  handleReturnedServerError(e) {
    if (
      e instanceof ActionError ||
      e instanceof UsecaseError ||
      e instanceof DataAccessError
    )
      return e.message;
    return DEFAULT_SERVER_ERROR;
  },
});

export class ActionError extends Error {}
