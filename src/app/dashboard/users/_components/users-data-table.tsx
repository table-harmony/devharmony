import { getUsersUseCase } from "@/infrastructure/users";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { CreateUserSheet } from "./sheets/create-user-sheet";

import { PlusIcon } from "lucide-react";

import { DataTable } from "@/components/data-table/data-table";
import {
  DataTableFilter,
  DataTableFilterSkeleton,
  DataTableViewOptions,
  DataTableViewOptionsSkeleton,
} from "@/components/data-table/data-table-toolbar";
import {
  DataTableBody,
  DataTableBodySkeleton,
} from "@/components/data-table/data-table-body";
import {
  DataTablePagination,
  DataTablePaginationSkeleton,
} from "@/components/data-table/data-table-pagination";
import { usersColumns } from "./columns";

function DataTableToolbar() {
  return (
    <div className="flex flex-col gap-2.5 md:flex-row md:justify-between">
      <DataTableFilter />
      <div className="flex gap-2">
        <CreateUserSheet>
          <Button variant="outline">
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            New user
          </Button>
        </CreateUserSheet>
        <DataTableViewOptions />
      </div>
    </div>
  );
}

export async function UsersDataTable() {
  const data = await getUsersUseCase();

  return (
    <DataTable data={data} columns={usersColumns}>
      <DataTableToolbar />
      <DataTableBody />
      <DataTablePagination />
    </DataTable>
  );
}

export function UsersDataTableSkeleton() {
  return (
    <div className="w-full space-y-2.5">
      <div className="flex flex-col gap-2.5 md:flex-row md:justify-between">
        <DataTableFilterSkeleton />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[120px]" />
          <DataTableViewOptionsSkeleton />
        </div>
      </div>
      <DataTableBodySkeleton />
      <DataTablePaginationSkeleton />
    </div>
  );
}
