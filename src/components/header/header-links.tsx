"use client";

import { LogoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SchoolIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import useMediaQuery from "@/hooks/use-media-query";
import { usePathname } from "next/navigation";
import { useSession } from "@clerk/nextjs";

export function HeaderLinks() {
  const { session } = useSession();
  const isLoggedIn = !!session;
  const { isMobile } = useMediaQuery();
  const path = usePathname();

  if (isMobile) {
    return (
      <div>
        <Link href="/" aria-label="logo">
          <LogoIcon className="size-6" />
        </Link>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <Link href="/" className="flex w-fit items-center space-x-2">
        <LogoIcon className="size-7" />
        <span className="flex flex-col -space-y-2 font-semibold uppercase">
          <span>dev</span>
          <span className="text-primary">harmony</span>
        </span>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-8">
      <Link href="/" className="flex w-fit items-center space-x-2">
        <LogoIcon className="size-7" />
        <span className="flex flex-col -space-y-2 font-semibold uppercase">
          <span>dev</span>
          <span className="text-primary">harmony</span>
        </span>
      </Link>
      <div className="hidden items-center gap-2 md:flex">
        <Button
          variant="ghost"
          className={path === "/schools" ? "bg-muted" : ""}
          asChild
        >
          <Link className="flex items-center gap-2" href="/schools">
            <SchoolIcon className="size-4" />
            <span>Schools</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={path === "/browse" ? "bg-muted" : ""}
          asChild
        >
          <Link className="flex items-center gap-2" href="/browse">
            <SearchIcon className="size-4" />
            <span>Browse</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
