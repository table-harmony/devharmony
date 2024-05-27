"use client";

import { UserDto } from "@/infrastructure/users";
import { AccountDto } from "@/infrastructure/accounts";
import { SessionDto } from "@/infrastructure/sessions";
import { TokenDto } from "@/infrastructure/tokens";

import { ColumnDef } from "@tanstack/react-table";
import { TableColumnHeader } from "@/components/data-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { UserActions } from "./user-actions";

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
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.getValue("image")} alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      );
    },
    header: "",
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <TableColumnHeader column={column} title="id" />,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="email" />,
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="emailVerified" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("emailVerified")) return <>null</>;
      return new Date(row.getValue("emailVerified")).toLocaleDateString(
        "en-GB"
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "password",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="password" />
    ),
  },
  {
    accessorKey: "salt",
    header: ({ column }) => <TableColumnHeader column={column} title="salt" />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <TableColumnHeader column={column} title="role" />,
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <UserActions row={row} />,
    enableSorting: false,
  },
];

export const account: ColumnDef<AccountDto>[] = [
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
    accessorKey: "id",
    header: ({ column }) => <TableColumnHeader column={column} title="id" />,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <TableColumnHeader column={column} title="type" />,
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="userId" />
    ),
  },
];

export const session: ColumnDef<SessionDto>[] = [
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
    accessorKey: "id",
    header: ({ column }) => <TableColumnHeader column={column} title="id" />,
    enableHiding: false,
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="userId" />
    ),
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="expiresAt" />
    ),
    cell: ({ row }) => {
      return new Date(row.getValue("expiresAt")).toLocaleDateString("en-GB");
    },
    filterFn: "includesString",
  },
];

export const verification_token: ColumnDef<TokenDto>[] = [
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
    accessorKey: "id",
    header: ({ column }) => <TableColumnHeader column={column} title="id" />,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="email" />,
  },
  {
    accessorKey: "token",
    header: ({ column }) => <TableColumnHeader column={column} title="token" />,
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="expiresAt" />
    ),
    filterFn: "includesString",
  },
];

export const magic_link_token: ColumnDef<TokenDto>[] = [
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
    accessorKey: "id",
    header: ({ column }) => <TableColumnHeader column={column} title="id" />,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="email" />,
  },
  {
    accessorKey: "token",
    header: ({ column }) => <TableColumnHeader column={column} title="token" />,
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="expiresAt" />
    ),
    filterFn: "includesString",
  },
];
