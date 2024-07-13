import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SettingsTabs } from "./tabs-section";

export function SettingsHeader() {
  return (
    <PageHeader>
      <PageHeaderHeading className="hidden md:block">
        Account settings
      </PageHeaderHeading>
      <PageHeaderHeading className="md:hidden">Settings</PageHeaderHeading>
      <PageHeaderDescription>
        Manage your account and set preferences.
      </PageHeaderDescription>
      <PageActions>
        <SettingsTabs />
      </PageActions>
    </PageHeader>
  );
}
