import Link from "next/link";
import { isLoggedIn } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/toggle";
import { Search } from "@/components/navigation/search";
import { Profile } from "@/components/navigation/profile";

export const Navbar = async () => {
  const isLogged = await isLoggedIn();

  return (
    <div className="flex justify-between w-full bg-primary-foreground p-2">
      <Button variant="link" asChild>
        <Link href="/">Home</Link>
      </Button>
      <Search />
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        {isLogged ? (
          <Profile />
        ) : (
          <Button variant="outline" asChild>
            <Link href="/api/auth/signin">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
