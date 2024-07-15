import { env } from "@/env";

import { createServerActionProcedure } from "zsa";

import { assertAuthenticated } from "@/utils/session";
import { assertRateLimit } from "@/lib/limiter";
import { PublicError } from "@/utils/errors";

function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof PublicError;
  // let's all errors pass through to the UI so debugging locally is easier
  const isDev = env.NODE_ENV === "development";
  if (isAllowedError || isDev) {
    console.error(err);
    return {
      code: err.code ?? "ERROR",
      message: `${!isAllowedError && isDev ? "DEV ONLY ENABLED - " : ""}${
        err.message
      }`,
    };
  } else {
    return {
      code: "ERROR",
      message: "Something went wrong",
    };
  }
}

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    await assertRateLimit();

    const { user, session } = await assertAuthenticated();

    return { user, session };
  });

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    await assertRateLimit();

    return { user: null, session: null };
  });
