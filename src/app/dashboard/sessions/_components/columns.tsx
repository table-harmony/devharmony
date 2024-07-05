"use client";

import { Session } from "@/infrastructure/sessions";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DeleteSessionAlert } from "./delete-session-alert";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export const session: ColumnDef<Session>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="userId" />
    ),
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="expiresAt" />
    ),
    cell: ({ row }) => {
      return new Date(row.getValue("expiresAt")).toLocaleDateString("en-GB");
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <Actions row={row} />,
    enableSorting: false,
  },
];

function Actions({ row }: { row: Row<Session> }) {
  return (
    <div className="flex items-center gap-2">
      <DeleteSessionAlert sessionId={row.getValue("id")}>
        <Button variant="ghost" size="icon">
          <TrashIcon className="size-4" />
        </Button>
      </DeleteSessionAlert>
    </div>
  );
}
