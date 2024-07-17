import { ConfigurationPanel } from "@/components/configuration-panel";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <ConfigurationPanel title="Image">
        <div className="flex w-full flex-col gap-4">
          <span>To update your school image, please fill the form below </span>
        </div>
      </ConfigurationPanel>
      <ConfigurationPanel title="Display name">
        <div className="flex w-full flex-col gap-4">
          <span>To update school name, please fill the form below</span>
        </div>
      </ConfigurationPanel>
      <ConfigurationPanel title="Info">
        <></>
      </ConfigurationPanel>
    </div>
  );
}
