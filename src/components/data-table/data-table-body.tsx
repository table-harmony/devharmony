"use client";

import { useContext } from "react";

import { flexRender } from "@tanstack/react-table";
import { DataTableContext } from "@/components/data-table/data-table-context";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function DataTableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { table } = useContext(DataTableContext);

  return (
    <div className={cn("rounded-md border", className)} {...props}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="max-w-56 truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length}>
                <div className="flex flex-col items-center justify-center space-y-8 py-8">
                  <span className="font-semibold">No results.</span>
                  <Image
                    src="/assets/no-data.svg"
                    width="200"
                    height="200"
                    alt="no data"
                  />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function DataTableBodySkeleton() {
  return <Skeleton className="h-64 w-full" />;
}
