import { getSession } from "@/lib/session";

import { AwaitedReactNode } from "react";

export async function SignedOut({ children }: { children: AwaitedReactNode }) {
  const { user } = await getSession();

  return !user && children;
}
