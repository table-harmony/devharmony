import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Schools",
  description: "TODO",
});

export default function SchoolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
