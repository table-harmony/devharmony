import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DataTableActions<TData> {
  table: Table<TData>;
}

export function DataTableActions<TData>({ table }: DataTableActions<TData>) {
  return (
    <div className="flex gap-1">
      {table.getSelectedRowModel().rows.length !== 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="destructive">
              <TrashIcon className="w-4 h-4 mr-2" /> Delete{" "}
              {table.getSelectedRowModel().rows.length} record
              {table.getSelectedRowModel().rows.length !== 1 && "s"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[425px] rounded-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm delete</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to delete the selected record(s) permanently.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
