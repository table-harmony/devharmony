import { isLoggedIn } from "@/lib/auth";

import { CommandMenu } from "@/components/command-menu";
import { LoginButton } from "@/components/login-button";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Profile } from "@/components/profile";

export async function SiteHeader() {
  const loggedIn = await isLoggedIn();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-muted/95 backdrop-blur supports-[backdrop-filter]:bg-muted/60">
      <div className="container flex h-14 max-w-screen-2xl items-center md:justify-between gap-2">
        <MainNav />
        <MobileNav />
        <CommandMenu />
        <nav className="flex items-center gap-2">
          <ModeToggle />
          {loggedIn ? (
            <Profile />
          ) : (
            <LoginButton variant="outline">Login</LoginButton>
          )}
        </nav>
      </div>
    </header>
  );
}
