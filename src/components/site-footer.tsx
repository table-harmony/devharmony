import Link from "next/link";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-4 p-4 bg-muted/60">
      <div className="container flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
          Bagrut project by <span className="font-medium">Liron kaner.</span>{" "}
          Source code available on <span className="font-medium">GitHub.</span>
        </p>
        <nav className="flex gap-2">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <Icons.linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </div>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
