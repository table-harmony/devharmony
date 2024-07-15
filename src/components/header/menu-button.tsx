"use client";

import useMediaQuery from "@/hooks/use-media-query";
import {
  ExternalLinkIcon,
  LogOutIcon,
  MenuIcon,
  SchoolIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/components/providers/session-provider";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export function MenuButton() {
  const { user } = useSession();
  const { isMobile } = useMediaQuery();
  const [open, setOpen] = useState(false);

  if (!isMobile)
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.picture || "/"} alt="profile" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="grid space-y-4">
          <div className="font-medium leading-none">
            <p className="text-sm">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Separator />
          <div className="grid space-y-4 text-sm text-muted-foreground">
            <Link
              href="/account-settings"
              className="flex w-full items-center gap-2 duration-200 hover:text-neutral-700 dark:hover:text-neutral-200"
              onClick={() => setOpen(false)}
            >
              <SettingsIcon className="size-4" />
              Account settings
            </Link>
            <Separator />
            <Link
              href="/logout"
              className="flex w-full items-center gap-2 hover:text-neutral-700 dark:hover:text-neutral-200"
              onClick={() => setOpen(false)}
            >
              <LogOutIcon className="size-4" />
              Logout
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    );

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="icon" variant="ghost" aria-label="menu">
          <MenuIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid space-y-4 text-sm text-muted-foreground">
        <Link href="/schools" className="flex items-center hover:text-primary">
          <SchoolIcon className="mr-2 size-4" /> Schools
        </Link>
        <Link href="/browse" className="flex items-center hover:text-primary">
          <SearchIcon className="mr-2 size-4" />
          Browse schools
        </Link>
        <Link
          href="/account-settings"
          className="flex items-center hover:text-primary"
        >
          <SettingsIcon className="mr-2 size-4" />
          Account settings
        </Link>
        <Separator />
        <Link
          href="/"
          className="flex items-center justify-between hover:text-primary"
        >
          Homepage
          <ExternalLinkIcon className="size-4" />
        </Link>
        <div className="flex items-center justify-between">
          Theme <ModeToggle />
        </div>
        <Link href="/logout" className="hover:text-primary">
          Logout
        </Link>
      </PopoverContent>
    </Popover>
  );
}
