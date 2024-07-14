"use client";

import { Notification } from "@/db/schema";

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteNotificationForm } from "./forms/delete-notification-form";
import { SwitchReadNotificationForm } from "./forms/switch-read-notification-form";

export const columns: ColumnDef<Notification>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="title" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="createdAt" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("createdAt")) return <></>;
      return new Date(row.getValue("createdAt")).toLocaleDateString("en-GB");
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "read",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="read" />
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <Actions row={row} />,
    enableSorting: false,
  },
];

function Actions({ row }: { row: Row<Notification> }) {
  return (
    <div className="flex items-center gap-2">
      <SwitchReadNotificationForm
        notificationId={parseInt(row.getValue("id"))}
        isRead={row.getValue("read")}
      />

      <DeleteNotificationForm notificationId={parseInt(row.getValue("id"))} />
    </div>
  );
}
