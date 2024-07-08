"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { CommandMenu } from "./command-menu";

export function DashboardHeader() {
  return (
    <PageHeader>
      <PageHeaderHeading>Dashboard</PageHeaderHeading>
      <PageHeaderDescription>
        Effortlessly manage, edit, and delete data from the servers.
      </PageHeaderDescription>
      <PageActions>
        <CommandMenu />
      </PageActions>
    </PageHeader>
  );
}
