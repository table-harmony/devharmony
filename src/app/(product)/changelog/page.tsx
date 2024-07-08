import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ChangelogList } from "./changelog-list";

export default function ChangelogPage() {
  return (
    <div className="container">
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
