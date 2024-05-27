"use client";

import { ContextType, SessionContext } from "@/lib/auth/client";

export const SessionProvider = ({
  children,
  value,
}: React.PropsWithChildren<{ value: ContextType }>) => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
