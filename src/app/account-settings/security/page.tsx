import { ConfigurationPanel } from "@/components/configuration-panel";
import { LogoutButton } from "./logout-button";

export default function DangerPage() {
  return (
    <div>
      <ConfigurationPanel title="Sessions">
        <div className="flex flex-col gap-4">
          <span>Logout from all devices.</span>
          <LogoutButton />
        </div>
      </ConfigurationPanel>
    </div>
  );
}
