import { Suspense } from "react";

import { UsersTable, UsersTableSkeleton } from "./_components/users-table";

export default async function DashboardPage() {
  return (
    <div className="container space-y-8 p-4 md:px-20 md:py-16">
      <h1 className="text-2xl font-extrabold md:text-3xl xl:text-4xl">
        Dashboard
      </h1>
      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTable />
      </Suspense>
    </div>
  );
}
