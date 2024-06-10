import Link from "next/link";

import { validateRequest } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/user-dropdown";

export async function SiteHeader({ links }: { links?: React.ReactNode }) {
  const { user } = await validateRequest();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
      <div className="container flex h-14 items-center justify-between gap-2">
        {links}
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
