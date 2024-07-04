import { getSession } from "@/lib/session";

import { AwaitedReactNode } from "react";

export async function SignedIn({ children }: { children: AwaitedReactNode }) {
  const { user } = await getSession();

  return user && children;
}
