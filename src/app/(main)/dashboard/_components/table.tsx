import {
  TableProvider,
  TableContent,
  TableFooter,
  TableHeader,
} from "@/components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { models } from "../models";

interface TableProps {
  table: keyof typeof models;
}

export async function Table({ table }: TableProps) {
  const model = models[table];
  const data = await model.getData();

  return (
    //@ts-ignore
    <TableProvider data={data} columns={model.columns}>
      <div className="m-2 space-y-2">
        <TableHeader />
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>{model.name}</CardTitle>
            <CardDescription>{model.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <TableContent />
          </CardContent>
          <CardFooter className="hidden md:block">
            <TableFooter />
          </CardFooter>
        </Card>
      </div>
    </TableProvider>
  );
}
