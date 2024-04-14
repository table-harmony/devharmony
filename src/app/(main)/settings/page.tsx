import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { UpdateForm } from "./_components/update-form";
import { DeleteForm } from "./_components/delete-form";
import { UserInfo } from "@/components/user-info";

export default async function SettingsPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your account preferences and view or update your data.
        </PageHeaderDescription>
      </PageHeader>
      <Tabs defaultValue="account" className="mx-auto max-w-sm">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="update">Update</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>Account Information</CardHeader>
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
            <CardFooter className="text-muted-foreground font-medium text-sm">
              This action cannot be undone.
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
