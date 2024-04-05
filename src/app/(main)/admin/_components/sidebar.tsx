import Link from "next/link";
import { models } from "../models";

import { DatabaseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableList } from "./table-list";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" className="justify-start" asChild>
        <Link href="/admin">
          <DatabaseIcon className="w-4 h-4 mr-2" /> SQL Runner
        </Link>
      </Button>
      <TableList tables={Object.keys(models)} />
    </div>
  );
}
