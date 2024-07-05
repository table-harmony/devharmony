import { Suspense } from "react";

import {
  VerificationsDataTable,
  VerificationsDataTableSkeleton,
} from "./_components/verifications-data-table";

export default async function VerificationsPage() {
  return (
    <>
      <Suspense fallback={<VerificationsDataTableSkeleton />}>
        <VerificationsDataTable />
      </Suspense>
    </>
  );
}
