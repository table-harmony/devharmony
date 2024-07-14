"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export function Notifications() {
  const [isOpen, setOpen] = useState(false);
  const notifications = [];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="size-4" />
          {notifications.length > 0 && (
            <div className="absolute right-[1px] top-1 flex h-2 w-2 items-center justify-center rounded-full bg-blue-500 text-xs"></div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel className="flex justify-between">
          <span className="text-base">Notifications</span>
          <Link
            className="text-xs text-blue-400 hover:text-blue-500"
            href="/notifications"
            onClick={() => setOpen(false)}
          >
            View
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 && (
          <div className="flex items-center justify-center gap-2 p-4">
            <p className="text-sm font-medium">No new notifications</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
