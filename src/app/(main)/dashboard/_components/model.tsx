import { models } from "../models";

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

interface TableProps {
  modelKey: keyof typeof models;
}

export async function Model({ modelKey }: TableProps) {
  const model = models[modelKey];
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
