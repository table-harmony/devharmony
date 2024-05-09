import "./globals.css";
import { Fredoka as FontSans } from "next/font/google";

import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";

import { cn } from "@/lib/utils";
import { ContextProvider } from "@/components/context-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Drizzle",
  ],
  authors: [
    {
      name: "TableHarmony",
      url: "https://github.com/table-harmony",
    },
  ],
  creator: "TableHarmony",
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "./favicon.ico",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

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
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ContextProvider>
            <div className="relative flex min-h-screen flex-col bg-background">
              {children}
            </div>
          </ContextProvider>
        </body>
      </html>
    </>
  );
}
