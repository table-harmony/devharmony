import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Welcome to DevHarmony</PageHeaderHeading>
        <PageHeaderDescription>
          Share and collaborate repositories while engaging in a Discord-like
          community.
        </PageHeaderDescription>
        <PageActions>
          <Link
            href="/information"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
          >
            View FAQ
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-fit",
            )}
          >
            <GithubIcon className="mr-2 h-4 w-4" />
            Github
          </Link>
        </PageActions>
      </PageHeader>
    </div>
  );
}
