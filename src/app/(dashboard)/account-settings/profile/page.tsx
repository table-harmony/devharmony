import { ConfigurationPanel } from "@/components/configuration-panel";
import { UpdatePasswordForm } from "./_components/update-password-form";
import { UpdateNameForm } from "./_components/update-name-form";
import { EditBioForm } from "./_components/edit-bio-form";
import { UpdateImageForm } from "./_components/update-image-form";

export default async function ProfilePage() {
  return (
    <div className="space-y-8">
      <ConfigurationPanel title="Image">
        <div className="flex w-full flex-col gap-4">
          <span>To update your image, please fill the form below</span>
          <UpdateImageForm />
        </div>
      </ConfigurationPanel>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ConfigurationPanel title="Display name">
          <div className="flex w-full flex-col gap-4">
            <span>To update your display name, please fill the form below</span>
            <UpdateNameForm />
          </div>
        </ConfigurationPanel>
        <ConfigurationPanel title="Password">
          <div className="flex w-full flex-col gap-4">
            <span>To update your password, please fill the form below</span>
            <UpdatePasswordForm />
          </div>
        </ConfigurationPanel>
      </div>
      <ConfigurationPanel title="Bio">
        <EditBioForm />
      </ConfigurationPanel>
    </div>
  );
}
