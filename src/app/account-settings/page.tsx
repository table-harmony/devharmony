import { ConfigurationPanel } from "@/components/configuration-panel";
import { UpdatePasswordForm } from "./_components/update-password-form";
import { UpdateNameForm } from "./_components/update-name-form";
import { DeleteUserAlert } from "./_components/delete-user-alert";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export default async function SettingsPage() {
  return (
    <div className="container space-y-8 p-4 md:px-20 md:py-16">
      <h1 className="text-2xl font-extrabold md:text-3xl xl:text-4xl">
        Account settings
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ConfigurationPanel title="Display name">
          <div className="flex flex-col gap-4">
            <span>To update your display name, please fill the form below</span>
            <UpdateNameForm />
          </div>
        </ConfigurationPanel>
        <ConfigurationPanel title="Password">
          <div className="flex flex-col gap-4">
            <span>To update your password, please fill the form below</span>
            <UpdatePasswordForm />
          </div>
        </ConfigurationPanel>
      </div>
      <ConfigurationPanel title="Delete Account" variant="destructive">
        <div className="flex flex-col gap-4">
          <span>You can delete your account below</span>
          <DeleteUserAlert>
            <Button variant="destructive" className="w-full sm:w-auto">
              <TrashIcon className="mr-2 size-4" /> Delete
            </Button>
          </DeleteUserAlert>
        </div>
      </ConfigurationPanel>
    </div>
  );
}
