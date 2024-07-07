import { getSession } from "@/utils/session";
import { ReactNode } from "react";

export async function SignedIn({ children }: { children: ReactNode }) {
  const { user } = await getSession();
  return user && <>{children}</>;
}

export async function SignedOut({ children }: { children: ReactNode }) {
  const { user } = await getSession();
  return !user && <>{children}</>;
}
