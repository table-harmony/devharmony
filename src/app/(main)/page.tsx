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
import { Icons } from "@/components/icons";

export default function Home() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Welcome to TableHarmony</PageHeaderHeading>
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
              "w-full sm:w-fit"
            )}
          >
            <Icons.gitHub className="w-4 h-4 mr-2" />
            Github
          </Link>
        </PageActions>
      </PageHeader>
    </div>
  );
}
