import { CommandMenu } from "@/components/command-menu";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { Profile } from "@/components/profile";
import { LoginButton } from "@/components/login-button";

import { isLoggedIn } from "@/lib/auth";

export async function SiteHeader() {
  const loggedIn = await isLoggedIn();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container flex h-14 max-w-screen-2xl items-center md:justify-between gap-2">
        <MainNav />
        <MobileNav />
        <CommandMenu />
        <nav className="flex items-center gap-2">
          <ModeToggle />
          {loggedIn ? <Profile /> : <LoginButton>Login</LoginButton>}
        </nav>
      </div>
    </header>
  );
}
