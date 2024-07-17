import { ConfigurationPanel } from "@/components/configuration-panel";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { DeleteSchoolAlert } from "../../../delete-school-alert";

export default function DangerPage() {
  return (
    <div>
      <ConfigurationPanel title="Delete School" variant="destructive">
        <div className="flex flex-col gap-4">
          <span>You can delete your school below</span>
          <DeleteSchoolAlert schoolId={1}>
            <Button variant="destructive">
              <TrashIcon className="mr-2 size-4" /> Delete
            </Button>
          </DeleteSchoolAlert>
        </div>
      </ConfigurationPanel>
    </div>
  );
}
