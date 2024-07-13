import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SettingsHeader } from "./settings-header";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Account settings",
  description: "Manage your account and set preferences.",
});

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="container flex-1">
        <SettingsHeader />
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
