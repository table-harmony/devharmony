import { getUsers } from "@/data-access";
import { getUsersUseCase } from "@/use-cases";
import {
  TableProvider,
  TableContent,
  TableFooter,
  TableHeader,
} from "@/components/data-table";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { user } from "./_components/columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const data = await getUsersUseCase({ getUsers: getUsers });
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          Administer and access comprehensive database records effortlessly.
        </PageHeaderDescription>
      </PageHeader>
      <TableProvider data={data} columns={user}>
        <TableHeader />
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage Users</CardDescription>
          </CardHeader>
          <CardContent>
            <TableContent />
          </CardContent>
          <CardFooter>
            <TableFooter />
          </CardFooter>
        </Card>
      </TableProvider>
    </>
  );
}
