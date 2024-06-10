import { validateRequest } from "@/lib/auth";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UpdatePasswordForm } from "./update-password";
import { CopyButton } from "@/components/copy-button";

export default async function SettingsPage() {
  return (
    <div className="container space-y-16 pb-24 pt-12 md:py-20 lg:px-20">
      <h1 className="text-balance text-3xl font-bold lg:text-4xl">
        Account settings
      </h1>
      <div className="flex flex-col space-y-10">
        <UserId />
        <UpdateUserPassword />
      </div>
    </div>
  );
}

async function UserId() {
  const { user } = await validateRequest();

  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>ID</CardTitle>
        <CardDescription className="text-sm text-muted-foreground sm:text-base">
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

function UpdateUserPassword() {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription className="text-sm text-muted-foreground sm:text-base">
          To update your password, please fill the form below
        </CardDescription>
        <UpdatePasswordForm />
      </CardHeader>
    </Card>
  );
}
