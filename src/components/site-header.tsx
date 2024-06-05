import Link from "next/link";

import { validateRequest } from "@/lib/auth";

import { CommandMenu } from "@/components/command-menu";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/user-dropdown";

export async function SiteHeader() {
  const { user } = await validateRequest();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-14 items-center gap-2 md:justify-between">
        <MainNav />
        <MobileNav />
        <CommandMenu />
        {!user ? (
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        ) : (
          <UserDropdown />
        )}
      </div>
    </header>
  );
}
