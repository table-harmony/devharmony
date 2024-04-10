import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserInfo } from "@/components/user-info";

import { DeleteForm } from "./_components/delete-form";
import { UpdateForm } from "./_components/update-form";

export default async function SettingsPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your account preferences and view or update your data.
        </PageHeaderDescription>
      </PageHeader>
      <Tabs defaultValue="view" className="mx-auto max-w-sm">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="view">View</TabsTrigger>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          <Card>
            <CardHeader>View Account</CardHeader>
            <CardContent className="space-y-4">
              <UserInfo />
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
        <TabsContent value="delete">
          <Card>
            <CardHeader>Delete Account</CardHeader>
            <CardContent className="space-y-4">
              <DeleteForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
