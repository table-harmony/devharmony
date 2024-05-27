import Link from "next/link";

import { siteConfig } from "@/config/site";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="py-4 mt-4 md:px-4 md:py-0 bg-muted">
      <div className="container flex flex-col-reverse items-center justify-between gap-4 md:h-20 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Bagrut project in computer science, built by{" "}
          <span className="font-medium">Liron Kaner</span>.
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
              <GithubIcon className="h-4 w-4" />
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
              <LinkedinIcon className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </div>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
