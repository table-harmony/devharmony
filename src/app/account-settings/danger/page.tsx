import { ConfigurationPanel } from "@/components/configuration-panel";
import { Button } from "@/components/ui/button";
import { DeleteAccountAlert } from "./delete-account-alert";
import { TrashIcon } from "lucide-react";

export default function DangerPage() {
  return (
    <div>
      <ConfigurationPanel title="Delete Account" variant="destructive">
        <div className="flex flex-col gap-4">
          <span>You can delete your account below</span>
          <DeleteAccountAlert>
            <Button variant="destructive">
              <TrashIcon className="mr-2 size-4" /> Delete
            </Button>
          </DeleteAccountAlert>
        </div>
      </ConfigurationPanel>
    </div>
  );
}
