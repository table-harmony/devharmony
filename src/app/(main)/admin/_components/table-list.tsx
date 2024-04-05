"use client";

import Link from "next/link";
import { Table2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function TableList({ tables }: { tables: string[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("filter", term);
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <ScrollArea className="h-96 w-fit rounded-md border">
      <div className="p-4">
        <p className="mb-4 font-medium leading-none">Tables</p>
        <Input
          placeholder="Search tables..."
          defaultValue={searchParams.get("filter")?.toString()}
          onChange={(event) => handleSearch(event.target.value)}
          className="mb-4"
        />
        {tables
          .sort()
          .filter((table) =>
            table.includes(searchParams.get("filter") ?? "".toLowerCase())
          )
          .map((table) => (
            <>
              <Button
                key={table}
                variant="ghost"
                className="justify-start w-full"
                asChild
              >
                <Link
                  href={{
                    pathname: `/admin/${table}`,
                    search: `?${searchParams.toString()}`,
                  }}
                >
                  <Table2Icon className="w-4 h-4 mr-2" /> {table}
                </Link>
              </Button>
              <Separator className="my-1" />
            </>
          ))}
      </div>
    </ScrollArea>
  );
}
