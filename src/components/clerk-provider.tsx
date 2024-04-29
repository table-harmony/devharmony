"use client";

import { ClerkProvider as ImportedClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  if (theme === "dark") {
    return (
      <ImportedClerkProvider appearance={{ baseTheme: dark }}>
        {children}
      </ImportedClerkProvider>
    );
  }

  return <ImportedClerkProvider>{children}</ImportedClerkProvider>;
};
