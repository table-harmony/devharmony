import { SettingsHeader } from "./settings-header";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "School settings",
  description: "Manage your school and set preferences.",
});

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container mb-10">
        <SettingsHeader />
        {children}
      </div>
    </>
  );
}
