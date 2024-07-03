import { createServerActionProcedure } from "zsa";

import { validateRequest } from "@/lib/auth";

export const authenticatedAction = createServerActionProcedure().handler(
  async () => {
    const { user, session } = await validateRequest();

    if (!user || !session) throw new Error("Unauthorized!");

    return { user, session };
  },
);

export const unauthenticatedAction = createServerActionProcedure().handler(
  async () => {
    return { user: undefined };
  },
);
