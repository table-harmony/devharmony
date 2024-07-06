import { getSessionsUseCase } from "@/infrastructure/sessions";

import { DataTable } from "@/components/data-table/data-table";
import {
  DataTableBody,
  DataTableBodySkeleton,
} from "@/components/data-table/data-table-body";
import {
  DataTablePagination,
  DataTablePaginationSkeleton,
} from "@/components/data-table/data-table-pagination";
import {
  DataTableFilter,
  DataTableFilterSkeleton,
  DataTableViewOptions,
  DataTableViewOptionsSkeleton,
} from "@/components/data-table/data-table-toolbar";
import { sessionsColumns } from "./columns";

function DataTableToolbar() {
  return (
    <div className="flex flex-col gap-2.5 md:flex-row md:justify-between">
      <DataTableFilter />
      <div>
        <DataTableViewOptions />
      </div>
    </div>
  );
}

export async function SessionsDataTable() {
  const data = await getSessionsUseCase();

  return (
    <DataTable data={data} columns={sessionsColumns}>
      <DataTableToolbar />
      <DataTableBody />
      <DataTablePagination />
    </DataTable>
  );
}

export function SessionsDataTableSkeleton() {
  return (
    <div className="w-full space-y-2.5">
      <div className="flex flex-col gap-2.5 md:flex-row md:justify-between">
        <DataTableFilterSkeleton />
        <div className="flex gap-2">
          <DataTableViewOptionsSkeleton />
        </div>
      </div>
      <DataTableBodySkeleton />
      <DataTablePaginationSkeleton />
    </div>
  );
}
