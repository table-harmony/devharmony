import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { siteConfig } from "@/config/site";
import { CatIcon } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative z-10 flex flex-col border-t border-border bg-muted/60 py-8">
      <div className="container mx-auto px-4 pt-6 lg:px-20">
        <section className="xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="space-y-4 xl:col-span-2">
            <CatIcon className="h-12 w-12" />
            <div>
              <Link href="/" className="text-lg font-medium">
                {siteConfig.name}
              </Link>
              <p className="max-w-xs text-sm text-muted-foreground">
                {siteConfig.description}
              </p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="mt-4 flex flex-col space-y-4">
              <h3 className="font-semibold">Support</h3>
              <Link
                href="/contact"
                className="text-xs text-muted-foreground duration-200 hover:text-foreground"
              >
                Contact
              </Link>
              <Link
                href="/changelog"
                className="text-xs text-muted-foreground duration-200 hover:text-foreground"
              >
                Change log
              </Link>
            </div>
            <div className="mt-4 flex flex-col space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <Link
                href="/privacy-policy"
                className="text-xs text-muted-foreground duration-200 hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-xs text-muted-foreground duration-200 hover:text-foreground"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </section>
        <section className="mt-16 flex flex-col-reverse items-center border-t border-border pt-4 sm:mt-20 md:flex-row md:justify-between md:pt-8 lg:mt-24">
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
