import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ChangelogList } from "./changelog-list";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Changelog",
  description: "Stay up to date with the latest updates and improvements.",
});

export default function ChangelogPage() {
  return (
    <div className="container max-w-4xl">
      <PageHeader>
        <PageHeaderHeading>Changelog</PageHeaderHeading>
        <PageHeaderDescription>
          Stay up to date with the latest updates and improvements.
        </PageHeaderDescription>
      </PageHeader>
      <ChangelogList />
    </div>
  );
}
