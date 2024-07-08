import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DashboardHeader } from "./dashboard-header";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Dashboard",
  description: "Effortlessly manage, edit, and delete data from the servers.",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="container">
        <DashboardHeader />
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
