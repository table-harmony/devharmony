import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export function DashboardHeader() {
  return (
    <PageHeader>
      <PageHeaderHeading>Dashboard</PageHeaderHeading>
      <PageHeaderDescription>
        Effortlessly manage, edit, and delete data from the servers.
      </PageHeaderDescription>
    </PageHeader>
  );
}
