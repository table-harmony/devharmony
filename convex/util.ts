import { ActionCtx, MutationCtx, QueryCtx } from "./_generated/server";

export function formatName(
  firstName?: string | null,
  lastName?: string | null,
) {
  firstName = firstName ?? "";
  lastName = lastName ?? "";
  let combinedName = `${firstName} ${lastName}`.trim();
  if (combinedName === "") {
    combinedName = "Anonymous";
  }
  return combinedName;
}

export async function getClerkId(ctx: QueryCtx | ActionCtx | MutationCtx) {
  return (await ctx.auth.getUserIdentity())?.subject;
}
