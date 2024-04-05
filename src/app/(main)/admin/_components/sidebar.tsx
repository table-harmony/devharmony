"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { DatabaseIcon, Table2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getModelsAction } from "../_actions/get-models.action";

export default function Sidebar() {
  const [filterTable, setFilterTable] = useState("");
  const [models, setModels] = useState([""]);

  const onSubmit = useCallback(() => {
    getModelsAction()
      .then((data) => {
        setModels(data);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" className="justify-start" asChild>
        <Link href="/admin">
          <DatabaseIcon className="w-4 h-4 mr-2" /> SQL Runner
        </Link>
      </Button>
      <div className="flex flex-col gap-1">
        <Input
          placeholder="Search tables"
          onChange={(event) => setFilterTable(event.target.value)}
        />
        {models
          .filter((model) => model.includes(filterTable.toLowerCase()))
          .map((model) => (
            <Button
              variant="ghost"
              key={model}
              className="justify-start"
              asChild
            >
              <Link href={`/admin/${model}`}>
                <Table2Icon className="w-4 h-4 mr-2" /> {model}
              </Link>
            </Button>
          ))}
      </div>
    </div>
  );
}
