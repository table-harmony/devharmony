import { createContext, useContext } from "react";

import { validateRequest } from "@/lib/auth/validate-request";

export type ContextType = Awaited<ReturnType<typeof validateRequest>>;

export const SessionContext = createContext<ContextType>({
  session: null,
  user: null,
});

export const useSession = () => useContext(SessionContext);
