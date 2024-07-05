"use client";

import { VerificationToken } from "@/infrastructure/verification-tokens";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { ColumnDef, Row } from "@tanstack/react-table";
import { DeleteVerificationAlert } from "./delete-verification-alert";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export const verifications: ColumnDef<VerificationToken>[] = [
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
    accessorKey: "token",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="token" />
    ),
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="expiresAt" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("expiresAt")) return <></>;
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

function Actions({ row }: { row: Row<VerificationToken> }) {
  return (
    <div className="flex items-center gap-2">
      <DeleteVerificationAlert verificationId={row.getValue("id")}>
        <Button variant="ghost" size="icon">
          <TrashIcon className="size-4" />
        </Button>
      </DeleteVerificationAlert>
    </div>
  );
}
