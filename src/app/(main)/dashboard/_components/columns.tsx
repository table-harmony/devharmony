"use client";

import { UserDto } from "@/infrastructure/users";
import { AccountDto } from "@/infrastructure/accounts";

import { DeleteUserForm } from "./delete-form";
import { EditUserForm } from "./edit-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableColumnHeader } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisIcon } from "lucide-react";

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
    accessorKey: "role",
    header: ({ column }) => <TableColumnHeader column={column} title="role" />,
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <EllipsisIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <EditUserForm row={row} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteUserForm row={row} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
    accessorKey: "userId",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="userId" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => <TableColumnHeader column={column} title="type" />,
  },
  {
    accessorKey: "provider",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="provider" />
    ),
  },
  {
    accessorKey: "providerAccountId",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="providerAccountId" />
    ),
  },
  {
    accessorKey: "refresh_token",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="refresh_token" />
    ),
  },
  {
    accessorKey: "access_token",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="access_token" />
    ),
  },
  {
    accessorKey: "expires_at",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="expires_at" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("expires_at")) return <>null</>;
      return new Date(row.getValue("expires_at")).toLocaleDateString("en-GB");
    },
  },
  {
    accessorKey: "token_type",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="token_type" />
    ),
  },
  {
    accessorKey: "scope",
    header: ({ column }) => <TableColumnHeader column={column} title="scope" />,
  },
  {
    accessorKey: "id_token",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="id_token" />
    ),
  },
  {
    accessorKey: "session_state",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="session_state" />
    ),
  },
];
