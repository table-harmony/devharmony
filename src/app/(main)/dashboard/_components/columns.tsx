"use client";

import { UserDto } from "@/infrastructure/users";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

import { TableColumnHeader } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";

export const user: ColumnDef<UserDto>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.getValue("image")} alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <TableColumnHeader column={column} title="id" />,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="email" />,
  },
  {
    accessorKey: "password",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="password" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("password")) return <>null</>;
      return <>{row.getValue("password")}</>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => <TableColumnHeader column={column} title="name" />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <TableColumnHeader column={column} title="role" />,
  },
];
