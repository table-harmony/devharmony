"use client";

import { useContext, useState } from "react";
import { DataTableContext } from "./context";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

export function DataTableFilter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { table } = useContext(DataTableContext);
  const [search, setSearch] = useState("");

  return (
    <div className={cn("hidden gap-2 sm:flex", className)} {...props}>
      <Input
        placeholder="Filter..."
        value={(table.getColumn(search)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(search)?.setFilterValue(event.target.value)
        }
        className="sm:w-[300px] lg:w-[350px]"
        disabled={!search}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            disabled={
              table
                .getAllColumns()
                .filter(
                  (column) =>
                    !["actions", "image", "select"].includes(column.id),
                ).length === 0
            }
          >
            <SearchIcon className="h-4 w-4 md:mr-2" />
            <span className="sr-only whitespace-nowrap md:not-sr-only">
              Search
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Search by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={search} onValueChange={setSearch}>
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  !["actions", "picture", "select"].includes(column.id),
              )
              .map((column) => {
                return (
                  <DropdownMenuRadioItem
                    key={column.id}
                    value={column.id}
                    className="capitalize"
                  >
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
