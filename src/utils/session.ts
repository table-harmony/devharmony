import { currentUser } from "@clerk/nextjs/server";

import { AuthenticationError } from "@/utils/errors";

export async function assertAuthenticated() {
  const user = await currentUser();

  if (!user) throw new AuthenticationError();

  return user;
}
