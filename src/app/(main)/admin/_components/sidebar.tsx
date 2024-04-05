import Link from "next/link";
import { DatabaseIcon, Table2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { models } from "../models";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" className="justify-start" asChild>
        <Link href="/admin">
          <DatabaseIcon className="w-4 h-4 mr-2" /> SQL Runner
        </Link>
      </Button>
      <div className="flex flex-col gap-1">
        {Object.keys(models).map((model) => (
          <Button key={model} variant="ghost" className="justify-start" asChild>
            <Link href={`/admin/${model}`}>
              <Table2Icon className="w-4 h-4 mr-2" /> {model}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
