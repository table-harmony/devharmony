import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UpdatePasswordForm } from "./update-password";
import { DeleteForm } from "./delete-user";
import { CopyButton } from "@/components/ui/copy-button";

export default async function SettingsPage() {
  const { user } = await validateRequest();

  if (!user) return redirect("/");

  return (
    <div className="container relative">
      <Card>
        <CardHeader>
          <CardTitle>Accound ID</CardTitle>
          <CardDescription>
            This is your user ID within DevHarmony.
          </CardDescription>
          <CardFooter>
            <pre>{user.id}</pre>
            <CopyButton value={user.id} />
          </CardFooter>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Permanently remove your Personal Account and all of its contents
            from DevHarmony.
          </CardDescription>
          <CardFooter className="justify-end">
            <DeleteForm />
          </CardFooter>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardContent>
            <UpdatePasswordForm />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
