import Link from "next/link";

import { siteConfig } from "@/config/site";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative z-10 flex flex-col border-t border-border py-8">
      <div className="container mx-auto px-4 lg:px-20">
        <section className="flex flex-col items-center space-y-2">
          <Link href="/" className="text-2xl font-medium">
            {siteConfig.name}
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="rounded-full">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">github</span>
                <GithubIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="icon" variant="outline" className="rounded-full">
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">linkedin</span>
                <LinkedinIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
        <section className="mt-8 flex flex-col-reverse items-center border-t border-border pt-4 md:flex-row md:justify-between md:pt-8">
          <p className="mt-4 w-full text-balance text-left text-sm leading-loose text-muted-foreground md:mt-0">
            Built by{" "}
            <Link
              href="https://tableharmony.io"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              TableHarmony.
            </Link>{" "}
            The source code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub.
            </Link>
          </p>
          <div className="flex w-full justify-start md:justify-end">
            <ModeToggle />
          </div>
        </section>
      </div>
    </footer>
  );
}
