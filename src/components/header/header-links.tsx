import { LogoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getSession } from "@/utils/session";
import { SchoolIcon, SearchIcon, SlashIcon } from "lucide-react";
import Link from "next/link";

export async function HeaderLinks() {
  const { user } = await getSession();
  const isLoggedIn = !!user;

  if (!isLoggedIn) {
    return (
      <div>
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon className="size-6" />
          <span className="font-semibold uppercase">{siteConfig.name}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="flex items-center gap-2">
        <LogoIcon className="size-6" />
      </Link>
      <div className="hidden items-center gap-4 md:flex">
        <SlashIcon className="size-4 -rotate-12" />
        <Link href="/schools">{user.name}</Link>
        <div className="ml-4 flex items-center">
          <Button variant="ghost" asChild>
            <Link className="flex items-center gap-2" href="/schools">
              <SchoolIcon className="size-4" />
              <span>Schools</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link className="flex items-center gap-2" href="/browse">
              <SearchIcon className="size-4" />
              <span>Browse</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
