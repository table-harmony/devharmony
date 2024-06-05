import { validateRequest } from "@/lib/auth";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UpdatePasswordForm } from "./update-password";
import { DeleteForm } from "./delete-user";
import { CopyButton } from "@/components/ui/copy-button";

export default async function SettingsPage() {
  return (
    <div className="container space-y-16 pb-24 pt-12 md:py-20 lg:px-20">
      <h1 className="text-balance text-xl font-bold md:text-3xl lg:text-4xl">
        Account settings
      </h1>
      <div className="flex flex-col space-y-10">
        <UserId />
        <UpdateUserPassword />
        <DeleteUser />
      </div>
    </div>
  );
}

async function UserId() {
  const { user } = await validateRequest();

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Dev ID</CardTitle>
        <CardDescription>
          This is your user ID within DevHarmony.
        </CardDescription>
        <div className="flex w-full items-center justify-between gap-2 rounded-md border p-2 md:w-fit">
          <pre className="overflow-hidden truncate">{user?.id}</pre>
          <CopyButton value={user?.id} variant="secondary" />
        </div>
      </CardHeader>
    </Card>
  );
}

function DeleteUser() {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          <span className="hidden md:block">
            Permanently remove your Personal Account and all of its contents
            from DevHarmony.
          </span>
          <span className="block md:hidden">
            Permanently remove your Personal Account
          </span>
        </CardDescription>
        <DeleteForm />
      </CardHeader>
    </Card>
  );
}

function UpdateUserPassword() {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          <span className="hidden md:block">
            Enter the password you want to use to log in with DevHarmony.
          </span>
          <span className="md:hidden">Update password</span>
        </CardDescription>
        <UpdatePasswordForm />
      </CardHeader>
    </Card>
  );
}
