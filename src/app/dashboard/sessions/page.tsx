import { Suspense } from "react";

import {
  SessionsDataTable,
  SessionsDataTableSkeleton,
} from "./_components/sessions-data-table";

export default async function VerificationsPage() {
  return (
    <>
      <Suspense fallback={<SessionsDataTableSkeleton />}>
        <SessionsDataTable />
      </Suspense>
    </>
  );
}
