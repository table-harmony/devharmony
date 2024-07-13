import { CreateSchoolSheet } from "./create-school-panel";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <PageHeader>
      <PageHeaderHeading>Dashboard</PageHeaderHeading>
      <PageHeaderDescription>Your schools</PageHeaderDescription>
      <PageActions>
        <CreateSchoolSheet />
        <Button asChild variant="secondary">
          <Link href="/schools">
            <SearchIcon className="mr-2 size-4" /> Browse schools
          </Link>
        </Button>
      </PageActions>
    </PageHeader>
  );
}
