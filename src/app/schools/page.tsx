import { assertAuthenticated } from "@/utils/session";

import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { CreateSchoolSheet } from "./_components/create-school-sheet";

export default async function SchoolsPage() {
  const { user } = await assertAuthenticated();

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Schools</PageHeaderHeading>
        <PageActions>
          <CreateSchoolSheet />
        </PageActions>
      </PageHeader>
    </div>
  );
}
