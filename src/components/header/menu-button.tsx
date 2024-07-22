"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import useMediaQuery from "@/hooks/use-media-query";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { publicRoutes } from "@/config/routes";
import { usePathname } from "next/navigation";

export function MenuButton() {
  const { isMobile } = useMediaQuery();
  const path = usePathname();

  if (!isMobile) return <UserButton />;

  const isPublicRoute = publicRoutes.some((route) => path === route);

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="icon" variant="ghost" aria-label="menu">
          <MenuIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="grid space-y-4 text-sm text-muted-foreground"
        align="end"
      >
        <Link
          href="/browse"
          className="hover:text-neutral-700 dark:hover:text-neutral-200"
        >
          Browse
        </Link>
        <Link
          href="/dashboard"
          className="hover:text-neutral-700 dark:hover:text-neutral-200"
        >
          Dashboard
        </Link>
        {isPublicRoute && (
          <>{/**TODO: add public links such as jobs and browse */}</>
        )}
        <Separator />
        <div className="flex items-center justify-between">
          Theme <ModeToggle />
        </div>
        <SignOutButton>
          <span className="cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-200">
            Sign out
          </span>
        </SignOutButton>
      </PopoverContent>
    </Popover>
  );
}
