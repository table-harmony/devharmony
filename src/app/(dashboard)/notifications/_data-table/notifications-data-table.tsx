import {
  DataTable,
  DataTableBody,
  DataTableSkeleton,
  DataTablePagination,
} from "@/components/data-table";
import { getNotificationsUseCase } from "@/use-cases/notifications";
import { assertAuthenticated } from "@/utils/session";
import { Suspense } from "react";
import { columns } from "./columns";
import { NotificationsDataTableToolbar } from "./toolbar";

async function NotificationsDataTable() {
  const { user } = await assertAuthenticated();
  const data = await getNotificationsUseCase(user.id);

  return (
    <DataTable data={data} columns={columns}>
      <NotificationsDataTableToolbar />
      <DataTableBody />
      <DataTablePagination />
    </DataTable>
  );
}

export function NotificationsDataTableWrapper() {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <NotificationsDataTable />
    </Suspense>
  );
}
