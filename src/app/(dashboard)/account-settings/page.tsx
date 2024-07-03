import { ConfigurationPanel } from "./_components/configuration-panel";
import { UpdatePasswordForm } from "./_components/update-password-form";
import { UpdateNameForm } from "./_components/update-name-form";
import { DeleteForm } from "./_components/delete-form";

export default function SettingsPage() {
  return (
    <div className="container space-y-8 p-4 md:px-20 md:py-16">
      <h1 className="text-2xl font-extrabold md:text-3xl xl:text-4xl">
        Account settings
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <ConfigurationPanel
          title="Display name"
          subtitle="To update your display name, please fill the form below"
        >
          <UpdateNameForm />
        </ConfigurationPanel>
        <ConfigurationPanel
          title="Password"
          subtitle="To update your password, please fill the form below"
        >
          <UpdatePasswordForm />
        </ConfigurationPanel>
      </div>
      <ConfigurationPanel
        title="Delete"
        subtitle="Permanently remove your Personal Account and all of its contents from the platform."
      >
        <DeleteForm />
      </ConfigurationPanel>
    </div>
  );
}
