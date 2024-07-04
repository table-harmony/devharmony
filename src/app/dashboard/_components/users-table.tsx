import { getUsersUseCase } from "@/infrastructure/users";

import { DataTable } from "@/components/data-table";
import { DataTableFilter } from "@/components/data-table/filter";
import { DataTableViewOptions } from "@/components/data-table/view-options";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateUserSheet } from "./sheets/create-user-sheet";
import * as columns from "./columns";
import { PlusIcon } from "lucide-react";

function Toolbar() {
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

export async function UsersTable() {
  const data = await getUsersUseCase();

  return (
    <DataTable data={data} columns={columns.user}>
      <Toolbar />
    </DataTable>
  );
}

export function UsersTableSkeleton() {
  return (
    <div className="w-full space-y-2.5">
      <div className="flex flex-col gap-2.5 md:flex-row md:justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-full md:w-[300px] lg:w-[350px]" />
          <Skeleton className="h-10 w-[60px] sm:w-[120px] lg:w-[105px]" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[90px]" />
        </div>
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
