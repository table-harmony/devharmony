import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@/lib/auth";
import { UpdateForm } from "./_components/update-form";

export default async function Settings() {
  const user = await currentUser();

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your account preferences and view or update your data.
        </PageHeaderDescription>
      </PageHeader>
      <Tabs defaultValue="account" className="mx-auto max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="update">Update</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>Account Information</CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">ID</p>
                <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
                  {user?.id}
                </p>
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">Name</p>
                <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
                  {user?.name}
                </p>
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">Email</p>
                <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
                  {user?.email}
                </p>
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">Role</p>
                <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-muted rounded-md">
                  {user?.role}
                </p>
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <p className="text-sm font-medium">Two Factor Authentication</p>
                <Badge
                  variant={user?.isTwoFactorEnabled ? "outline" : "destructive"}
                >
                  {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="update">
          <Card>
            <CardHeader>Update Account Details</CardHeader>
            <CardContent className="space-y-4">
              <UpdateForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
