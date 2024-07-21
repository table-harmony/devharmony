import "@/styles/globals.css";
import { Rubik as FontSans } from "next/font/google";

import { Viewport } from "next";
import { siteConfig } from "@/config/site";

import { cn } from "@/lib/utils";
import { BASE_URL, createMetadata } from "@/utils/metadata";

import { ContextProvider } from "@/components/providers/context-provider";
import NextTopLoader from "nextjs-toploader";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = createMetadata({
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  metadataBase: new URL(BASE_URL),
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ContextProvider>
          <div className="relative flex min-h-screen flex-col bg-background">
            <NextTopLoader showSpinner={false} />
            {children}
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
