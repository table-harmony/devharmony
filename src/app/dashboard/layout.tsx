import { SiteHeader } from "@/components/header/header";
import { SiteFooter } from "@/components/site-footer";
import { Links } from "./links";
import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Dashboard",
  description: "TODO",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader links={<Links />} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
