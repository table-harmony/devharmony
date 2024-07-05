import { Suspense } from "react";

import {
  UsersDataTable,
  UsersDataTableSkeleton,
} from "./_components/users-data-table";

export default async function UsersPage() {
  return (
    <>
      <Suspense fallback={<UsersDataTableSkeleton />}>
        <UsersDataTable />
      </Suspense>
    </>
  );
}
