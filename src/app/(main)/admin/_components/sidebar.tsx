"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DatabaseIcon, Table2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Sidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [filterTable, setFilterTable] = useState("");

  function handleTableUpdate(table: string) {
    const params = new URLSearchParams(searchParams);
    if (table) {
      params.set("table", table);
    } else {
      params.delete("table");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        className={`${!searchParams.get("table") && "bg-muted"} justify-start`}
        onClick={() => handleTableUpdate("")}
      >
        <DatabaseIcon className="w-4 h-4 mr-2" /> SQL Runner
      </Button>
      <div className="flex flex-col gap-1">
        <Input
          placeholder="Search tables"
          onChange={(event) => setFilterTable(event.target.value)}
        />
        {[
          "user",
          "account",
          "verification_token",
          "two_factor_token",
          "password_reset_token",
          "two_factor_confirmation",
        ]
          .filter((model) => model.includes(filterTable.toLowerCase()))
          .map((model) => (
            <Button
              variant="ghost"
              onClick={() => handleTableUpdate(model)}
              key={model}
              className={`${
                searchParams.get("table") === model && "bg-muted"
              } justify-start`}
            >
              <Table2Icon className="w-4 h-4 mr-2" /> {model}
            </Button>
          ))}
      </div>
    </div>
  );
}
