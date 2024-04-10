import { auth } from ".";

import { UserRole } from "@/use-cases";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

export const isLoggedIn = async () => {
  const session = await auth();

  return session !== null;
};
