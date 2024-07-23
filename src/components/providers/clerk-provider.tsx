"use client";

import { ClerkProvider as ImportedClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  if (resolvedTheme === "dark") {
    return (
      <ImportedClerkProvider appearance={{ baseTheme: dark }}>
        {children}
      </ImportedClerkProvider>
    );
  }

  return <ImportedClerkProvider>{children}</ImportedClerkProvider>;
}
