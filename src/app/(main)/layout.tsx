import { SiteHeader } from "@/components/header/header";
import { MainLinks } from "./dashboard/links";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader links={<MainLinks />} />
      <main className="flex-1">{children}</main>
    </>
  );
}
