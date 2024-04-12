"use client";

import { useContext } from "react";
import { TableContext } from "./context";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TableHeader() {
  return (
    <div className="flex justify-between">
      <TableFilter />
      <TableViewOptions />
    </div>
  );
}

function TableViewOptions() {
  const { table } = useContext(TableContext);

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <ListFilterIcon className="h-4 w-4 md:mr-2" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Filter
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value: boolean) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function TableFilter() {
  const { table } = useContext(TableContext);

  return (
    <Input
      placeholder="Filter..."
      value={(table.getAllColumns()[2].getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getAllColumns()[2].setFilterValue(event.target.value)
      }
      className="h-8 w-[150px] lg:w-[250px]"
    />
  );
}
