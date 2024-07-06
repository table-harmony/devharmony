import { getVerificationsUseCase } from "@/infrastructure/verification-tokens";

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
import { verificationsColumns } from "./columns";

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

export async function VerificationsDataTable() {
  const data = await getVerificationsUseCase();

  return (
    <DataTable data={data} columns={verificationsColumns}>
      <DataTableToolbar />
      <DataTableBody />
      <DataTablePagination />
    </DataTable>
  );
}

export function VerificationsDataTableSkeleton() {
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
