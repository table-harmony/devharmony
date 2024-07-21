import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexProvider } from "@/components/providers/convex-provider";
import { ClerkProvider } from "@/components/providers/clerk-provider";
import { Toaster } from "@/components/ui/toaster";

export async function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider>
        <ConvexProvider>
          {children}
          <Toaster />
        </ConvexProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
