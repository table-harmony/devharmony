import { currentUser } from "@/lib/session";

import { AwaitedReactNode } from "react";

export async function SignedIn({ children }: { children: AwaitedReactNode }) {
  const user = await currentUser();

  return user && children;
}
