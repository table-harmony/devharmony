"use client";

import { User } from "@/infrastructure/users";

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { EditUserSheet } from "./sheets/edit-user-sheet";
import { DeleteUserAlert } from "./delete-user-alert";

import { EditIcon, TrashIcon } from "lucide-react";

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "picture",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.getValue("picture")} alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      );
    },
    header: "",
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="email" />
    ),
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="emailVerified" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("emailVerified")) return <></>;
      return new Date(row.getValue("emailVerified")).toLocaleDateString(
        "en-GB",
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "password",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="password" />
    ),
  },
  {
    accessorKey: "salt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="salt" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="role" />
    ),
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <Actions row={row} />,
    enableSorting: false,
  },
];

function Actions({ row }: { row: Row<User> }) {
  return (
    <div className="flex items-center gap-2">
      <EditUserSheet
        userId={row.getValue("id")}
        data={{ role: row.getValue("role") }}
      >
        <Button variant="ghost" size="icon">
          <EditIcon className="size-4" />
        </Button>
      </EditUserSheet>
      <DeleteUserAlert userId={row.getValue("id")}>
        <Button variant="ghost" size="icon">
          <TrashIcon className="size-4" />
        </Button>
      </DeleteUserAlert>
    </div>
  );
}
