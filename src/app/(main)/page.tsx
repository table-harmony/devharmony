import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function Home() {
  return (
    <PageHeader>
      <PageHeaderHeading>Welcome to TableHarmony</PageHeaderHeading>
      <PageHeaderDescription>
        Share and collaborate repositories while engaging in a Discord-like
        community.
      </PageHeaderDescription>
      <PageActions></PageActions>
    </PageHeader>
  );
}
