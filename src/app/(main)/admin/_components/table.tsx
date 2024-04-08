import { models } from "../models";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";

interface TableProps {
  table: keyof typeof models;
}

export async function Table<TData, TValue>({ table }: TableProps) {
  const model = models[table];

  const data = (await model.getData()) as TData[];
  const columns = model.columns as ColumnDef<TData, TValue>[];

  return (
    <DataTable
      name={model.name}
      description={model.description}
      data={data}
      columns={columns}
    />
  );
}
