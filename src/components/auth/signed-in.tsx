import { getCurrentUser } from "@/lib/session";

import { AwaitedReactNode } from "react";

export async function SignedIn({ children }: { children: AwaitedReactNode }) {
  const user = await getCurrentUser();

  return user && children;
}
