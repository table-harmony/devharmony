import { DataTable } from "@/components/data-table";
import { models } from "./models";
import { ColumnDef } from "@tanstack/react-table";
import Console from "./_components/console";

export default async function AdminPage<TData, TValue>({
  searchParams,
}: {
  searchParams: {
    table?: string;
  };
}) {
  if (!searchParams.table || !Object.keys(models).includes(searchParams.table))
    return <Console />;

  const model = models[searchParams.table as keyof typeof models];

  const data = (await model.getData()) as TData[];
  const columns = model.columns as ColumnDef<TData, TValue>[];

  return <DataTable data={data} columns={columns} />;
}
