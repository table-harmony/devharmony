import { CommandMenu } from "@/components/command-menu";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { Profile } from "@/components/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center md:justify-between gap-2">
        <MainNav />
        <MobileNav />
        <CommandMenu />
        <nav className="flex items-center gap-2">
          <ModeToggle />
          <Profile />
        </nav>
      </div>
    </header>
  );
}
