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

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-extrabold md:text-3xl xl:text-4xl">
          Dashboard
        </h1>
        <p className="max-w-xs text-muted-foreground">
          Effortlessly manage, edit, and delete data from the servers.
        </p>
      </div>
      <Menu />
    </header>
  );
}

function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <LayoutGridIcon className="h-4 w-4" />
          <span className="sr-only">menu</span>
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
