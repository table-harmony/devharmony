"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import {
  LayoutGridIcon,
  MonitorIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";

export function TablesDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <LayoutGridIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Tables</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="users">
              <UsersIcon className="mr-2 h-4 w-4" />
              Users
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="verification-tokens">
              <ShieldIcon className="mr-2 h-4 w-4" />
              Verification tokens
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="sessions">
              <MonitorIcon className="mr-2 h-4 w-4" />
              Sessions
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
