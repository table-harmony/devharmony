"use client";

import { useContext, useState } from "react";
import { TableContext } from "./context";
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
import { Button } from "@/components/ui/button";
import {
  ListFilterIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export function TableHeader() {
  return (
    <div className="flex justify-between gap-4">
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
          <Button
            variant="outline"
            className="h-8"
            disabled={
              table.getAllColumns().filter(column => column.getCanHide())
                .length === 0
            }
          >
            <SlidersHorizontalIcon className="h-4 w-4 md:mr-2" />
            <span className="sr-only md:not-sr-only whitespace-nowrap">
              View
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(column => column.getCanHide())
            .map(column => {
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
  const [search, setSearch] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Filter..."
        value={(table.getColumn(search)?.getFilterValue() as string) ?? ""}
        onChange={event =>
          table.getColumn(search)?.setFilterValue(event.target.value)
        }
        className="h-8 sm:w-[300px] lg:w-[350px]"
        disabled={!search}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-8"
            disabled={
              table
                .getAllColumns()
                .filter(
                  column => !["actions", "image", "select"].includes(column.id)
                ).length === 0
            }
          >
            <SearchIcon className="h-4 w-4 md:mr-2" />
            <span className="sr-only md:not-sr-only whitespace-nowrap">
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
                column => !["actions", "image", "select"].includes(column.id)
              )
              .map(column => {
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
