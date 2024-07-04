"use client";

import { useContext, useState } from "react";

import { cn } from "@/lib/utils";

import { DataTableContext } from "@/components/data-table/context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const NON_FILTER = ["actions", "picture", "select"];

export function DataTableFilter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { table } = useContext(DataTableContext);
  const [searchColumn, setSearchColumn] = useState(
    table.getAllColumns().filter((column) => !NON_FILTER.includes(column.id))[0]
      ?.id,
  );

  if (
    table.getAllColumns().filter((column) => !NON_FILTER.includes(column.id))
      .length === 0
  )
    return;

  return (
    <div className={cn("flex gap-2", className)} {...props}>
      <Input
        placeholder="Filter..."
        value={
          (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn(searchColumn)?.setFilterValue(event.target.value)
        }
        className="md:w-[300px] lg:w-[350px]"
        disabled={!searchColumn}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <SearchIcon className="h-4 w-4 sm:mr-2" />
            <span className="sr-only whitespace-nowrap sm:not-sr-only">
              Search
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Search by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={searchColumn}
            onValueChange={setSearchColumn}
          >
            {table
              .getAllColumns()
              .filter((column) => !NON_FILTER.includes(column.id))
              .map((column) => {
                return (
                  <DropdownMenuRadioItem key={column.id} value={column.id}>
                    {column.id}
                  </DropdownMenuRadioItem>
                );
              })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
