import { getVerificationsUseCase } from "@/infrastructure/verification-tokens";

import { DataTable } from "@/components/data-table";
import { DataTableBody } from "@/components/data-table/body";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableFilter } from "@/components/data-table/filter";
import { DataTableViewOptions } from "@/components/data-table/view-options";

import { Skeleton } from "@/components/ui/skeleton";
import * as columns from "./columns";

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
    <DataTable data={data} columns={columns.verifications}>
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
        <div className="flex gap-2">
          <Skeleton className="h-10 w-full md:w-[300px] lg:w-[350px]" />
          <Skeleton className="h-10 w-[60px] sm:w-[120px] lg:w-[105px]" />
        </div>
        <Skeleton className="h-10 w-[90px]" />
      </div>
      <Skeleton className="h-64 w-full" />
      <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
        <Skeleton className="h-8 w-[150px]" />
        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-8 w-[4.5rem]" />
          </div>
          <Skeleton className="h-8 w-[72px]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-[32px]" />
            <Skeleton className="h-8 w-[32px]" />
            <Skeleton className="h-8 w-[32px]" />
            <Skeleton className="h-8 w-[32px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
