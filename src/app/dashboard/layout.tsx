import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { createMetadata } from "@/utils/metadata";
import { DashboardHeader } from "./dashboard-header";

export const metadata = createMetadata({
  title: "Dashboard",
  description: "Manage your account settings and set preferences.",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="container flex-1">
        <DashboardHeader />
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
