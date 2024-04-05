import { DataTable } from "@/components/data-table";
import { models } from "./models";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: {
    table?: string;
  };
}) {
  if (!searchParams.table || !Object.keys(models).includes(searchParams.table))
    return;

  const model = models[searchParams.table as keyof typeof models];

  const data = await model.getData();
  const columns = model.columns;

  //@ts-ignore
  return <DataTable data={data} columns={columns} />;
}
