import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./view-options";
import { DataTableActions } from "./actions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <header className="flex items-center justify-between">
      <DataTableActions table={table} />
      <DataTableViewOptions table={table} />
    </header>
  );
}
