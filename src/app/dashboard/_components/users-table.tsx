import { getUsersUseCase } from "@/infrastructure/users";

import { DataTable } from "@/components/data-table";
import { DataTableProvider } from "@/components/data-table/provider";
import { DataTableFilter } from "@/components/data-table/filter";
import { DataTableViewOptions } from "@/components/data-table/view-options";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateUserSheet } from "./sheets/create-user-sheet";
import * as columns from "./columns";
import { PlusIcon } from "lucide-react";

function Toolbar() {
  return (
    <div className="flex justify-between">
      <DataTableFilter />
      <div className="flex w-full justify-end gap-2">
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
    <DataTableProvider data={data} columns={columns.user}>
      <DataTable>
        <Toolbar />
      </DataTable>
    </DataTableProvider>
  );
}

export function UsersTableSkeleton() {
  return (
    <div className="w-full space-y-2.5 p-2">
      <div className="flex justify-between">
        <div className="hidden gap-2 sm:flex">
          <Skeleton className="h-10 sm:w-[300px] lg:w-[350px]" />
          <Skeleton className="h-10 sm:w-[50px] lg:w-[105px]" />
        </div>
        <div className="flex w-full justify-end gap-2">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[90px]" />
        </div>
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
