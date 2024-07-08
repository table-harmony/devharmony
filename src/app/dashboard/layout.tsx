import { SiteHeader } from "@/components/site-header";
import { DashboardHeader } from "./dashboard-header";
import { SiteFooter } from "@/components/site-footer";

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
