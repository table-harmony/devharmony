import Link from "next/link";

import { siteConfig } from "@/config/site";

import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/user-dropdown";
import { SignedOut, SignedIn } from "@/components/auth";
import { LogoIcon } from "@/components/icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon className="size-5" />
          <span className="font-bold uppercase">{siteConfig.name}</span>
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
