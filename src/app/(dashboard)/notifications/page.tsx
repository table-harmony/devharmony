import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { NotificationsDataTableWrapper } from "./_data-table/notifications-data-table";

export default function NotificationsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Notifications</PageHeaderHeading>
      </PageHeader>
      <NotificationsDataTableWrapper />
    </div>
  );
}
