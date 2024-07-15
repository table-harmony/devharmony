import { SiteHeader } from "@/components/header/header";
import { SiteFooter } from "@/components/site-footer";

export default function SchoolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
