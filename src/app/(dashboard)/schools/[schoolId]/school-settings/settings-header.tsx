import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export function SettingsHeader() {
  return (
    <PageHeader>
      <PageHeaderHeading className="hidden md:block">
        School settings
      </PageHeaderHeading>
      <PageHeaderHeading className="md:hidden">Settings</PageHeaderHeading>
      <PageHeaderDescription>
        Manage your school and set preferences.
      </PageHeaderDescription>
    </PageHeader>
  );
}
