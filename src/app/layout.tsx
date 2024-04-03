import "./globals.css";
import { Fredoka as FontSans } from "next/font/google";

import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { ContextProvider } from "@/components/context-provider";

export const metadata: Metadata = {
  title: "tableharmony",
  description: "bagrut project",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
