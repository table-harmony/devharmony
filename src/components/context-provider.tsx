import { getSession } from "@/utils/session";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/session-provider";

export async function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <SessionProvider value={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}
