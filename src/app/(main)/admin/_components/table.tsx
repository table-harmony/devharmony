import { DataTable } from "@/components/data-table";
import { Model } from "@/types/models";

interface TableProps {
  model: Model<any>;
}

export async function Table({ model }: TableProps) {
  const data = await model.getData();
  const columns = model.columns;

  return (
    <DataTable
      name={model.name}
      description={model.description}
      data={data}
      columns={columns}
    />
  );
}
