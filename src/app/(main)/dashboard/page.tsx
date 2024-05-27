import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ModelMenu } from "./_components/model-menu";

export default async function DashboardPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          Administer and access comprehensive database records effortlessly.
        </PageHeaderDescription>
        <PageActions>
          <ModelMenu />
        </PageActions>
      </PageHeader>
    </div>
  );
}
