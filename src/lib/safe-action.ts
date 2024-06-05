import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action";
import { validateRequest } from "@/lib/auth";

export const unauthenticatedAction = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof ActionError) return e.message;
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
    if (e instanceof ActionError) return e.message;
    return DEFAULT_SERVER_ERROR;
  },
});

export class ActionError extends Error {}
