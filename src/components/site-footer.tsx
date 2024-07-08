import { siteConfig } from "@/config/site";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LogoIcon, LinkedinIcon, GithubIcon } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-8 flex flex-col border-t border-border py-8">
      <div className="container space-y-10 px-4 pt-6 lg:px-20">
        <section className="xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="xl:col-span-2">
            <Header />
          </div>
          <div className="mt-12 flex flex-col gap-8 sm:grid sm:grid-cols-2 xl:col-span-3 xl:mt-0">
            <Links />
          </div>
        </section>
        <section className="flex items-center justify-between gap-4 border-t border-border pt-8">
          <Credits />
          <ModeToggle />
        </section>
      </div>
    </footer>
  );
}

function Links() {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <p className="font-semibold">Product</p>
        <Link
          href="/changelog"
          className="text-xs text-muted-foreground duration-200 hover:text-foreground"
        >
          Changelog
        </Link>
        <Link
          href="/contact"
          className="text-xs text-muted-foreground duration-200 hover:text-foreground"
        >
          Contact us
        </Link>
      </div>
      <div className="flex flex-col space-y-4">
        <p className="font-semibold">Legal</p>
        <Link
          href="/privacy-policy"
          className="text-xs text-muted-foreground duration-200 hover:text-foreground"
        >
          Privacy policy
        </Link>
        <Link
          href="/terms-of-service"
          className="text-xs text-muted-foreground duration-200 hover:text-foreground"
        >
          Terms of service
        </Link>
      </div>
    </>
  );
}

function Credits() {
  return (
    <p className="text-balance text-sm leading-loose text-muted-foreground">
      Built by{" "}
      <Link
        href="https://tableharmony.io"
        target="_blank"
        rel="noreferrer"
        className="font-semibold underline underline-offset-4"
      >
        TableHarmony.
      </Link>{" "}
      The source code is available on{" "}
      <Link
        href={siteConfig.links.github}
        target="_blank"
        rel="noreferrer"
        className="font-semibold underline underline-offset-4"
      >
        GitHub.
      </Link>
    </p>
  );
}

function Socials() {
  return (
    <div className="flex space-x-2">
      <Button size="icon" variant="outline" asChild>
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <span className="sr-only">github</span>
          <GithubIcon className="h-4 w-4" />
        </Link>
      </Button>
      <Button size="icon" variant="outline" asChild>
        <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
          <span className="sr-only">linkedin</span>
          <LinkedinIcon className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

function Header() {
  return (
    <div className="space-y-4">
      <Link href="/" className="flex items-center gap-2">
        <LogoIcon className="size-5 text-primary" />
        <span className="font-bold uppercase">
          <span className="text-primary">dev</span>harmony
        </span>
      </Link>
      <p className="max-w-xs text-sm text-muted-foreground">
        {siteConfig.description}
      </p>
      <Socials />
    </div>
  );
}
