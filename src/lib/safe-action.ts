import { createServerActionProcedure } from "zsa";

import { getSession } from "@/lib/session";

export const administratorAction = createServerActionProcedure().handler(
  async () => {
    const { user, session } = await getSession();

    if (!user || !session) throw new Error("Unauthorized!");

    if (user.role !== "admin") throw new Error("Forbidden: Admins only!");

    return { user, session };
  },
);

export const authenticatedAction = createServerActionProcedure().handler(
  async () => {
    const { user, session } = await getSession();

    if (!user || !session) throw new Error("Unauthorized!");

    return { user, session };
  },
);

export const unauthenticatedAction = createServerActionProcedure().handler(
  async () => {
    return { user: undefined };
  },
);
