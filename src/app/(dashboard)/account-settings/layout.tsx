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
      <div className="container">
        <SettingsHeader />
        {children}
      </div>
    </>
  );
}
