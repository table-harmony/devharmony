import { redirect } from "next/navigation";
import { models } from "./models";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { CommandMenu } from "./_components/command-menu";
import { Table } from "./_components/table";

interface DashboardPageProps {
  searchParams: {
    table: string;
  };
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const table = searchParams.table as keyof typeof models;

  if (table && !(table in models)) redirect("/dashboard");

  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          Administer and access comprehensive database records effortlessly.
        </PageHeaderDescription>
        <PageActions>
          <CommandMenu />
        </PageActions>
      </PageHeader>
      {table && <Table table={table} />}
    </div>
  );
}
