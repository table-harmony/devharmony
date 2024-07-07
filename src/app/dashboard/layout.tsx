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
      <div className="container space-y-8 p-4 md:py-16 lg:px-16">
        <DashboardHeader />
        {children}
      </div>
      <SiteFooter />
    </>
  );
}
