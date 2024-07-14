import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { cardStyles } from "@/styles/common";
import Image from "next/image";

export default function NotificationsPage() {
  return (
    <div className="container max-w-3xl">
      <PageHeader>
        <PageHeaderHeading>Notifications</PageHeaderHeading>
      </PageHeader>
      <div className={cardStyles}>
        <Image
          src="/assets/no-data.svg"
          alt="no data placeholder image"
          width="300"
          height="300"
        />
        <span className="font-semibold">No unread notifications</span>
      </div>
    </div>
  );
}
