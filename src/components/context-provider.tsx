import { validateRequest } from "@/lib/auth";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/session-provider";

export async function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider value={session}>{children}</SessionProvider>
      <Toaster />
    </ThemeProvider>
  );
}
