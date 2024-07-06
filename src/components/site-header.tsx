import Link from "next/link";

import { siteConfig } from "@/config/site";

import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/user-dropdown";

import { SignedOut } from "@/components/auth/signed-out";
import { SignedIn } from "@/components/auth/signed-in";

import { LogoIcon } from "@/components/icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon className="size-5 text-primary" />
          <span className="font-bold uppercase">
            <span className="text-primary">dev</span>harmony
          </span>
        </Link>
        <SignedIn>
          <UserDropdown />
        </SignedIn>
        <SignedOut>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </SignedOut>
      </div>
    </header>
  );
}
