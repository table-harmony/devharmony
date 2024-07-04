import { getUsersUseCase } from "@/infrastructure/users";

import { Suspense } from "react";

import {
  DataTable,
  DataTableProvider,
  DataTableViewOptions,
} from "@/components/data-table";
import * as columns from "./_components/columns";

export default async function DashboardPage() {
  return (
    <div className="container space-y-8 p-4 md:px-20 md:py-16">
      <h1 className="text-2xl font-extrabold md:text-3xl xl:text-4xl">
        Dashboard
      </h1>
      <Suspense fallback={<p>Loading...</p>}>
        <UsersTable />
      </Suspense>
    </div>
  );
}

async function UsersTable() {
  const data = await getUsersUseCase();

  return (
    <DataTableProvider data={data} columns={columns.user}>
      <DataTable>
        <div className="justify-between">
          <div>{/*SEARCH*/}</div>
          <div>
            {/*CREATE USER */}
            {/*EXPORT */}
            <DataTableViewOptions />
          </div>
        </div>
      </DataTable>
    </DataTableProvider>
  );
}
