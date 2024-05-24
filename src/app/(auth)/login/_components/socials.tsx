import Link from "next/link";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export function Socials() {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Link
        className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
        href="/api/login/google"
      >
        <Icons.google className="mr-2 h-4 w-4" />
        <span className="hidden md:block">Sign in with&nbsp;</span> Google
      </Link>
      <Link
        className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
        href="/api/login/github"
      >
        <Icons.gitHub className="mr-2 h-4 w-4" />
        <span className="hidden md:block">Sign in with&nbsp;</span> Github
      </Link>
    </div>
  );
}
