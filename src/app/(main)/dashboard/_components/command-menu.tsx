"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  LayoutGridIcon,
  SquareChevronRightIcon,
  Table2Icon,
} from "lucide-react";

export function CommandMenu() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [open, setOpen] = useState(false);

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("table", term);
    } else {
      params.delete("table");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 rounded-[0.5rem] bg-background md:w-72 lg:w-96"
        )}
        onClick={() => setOpen(true)}
      >
        <LayoutGridIcon className="w-4 h-4 mr-2" />
        Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tables">
            {[
              "user",
              "account",
              "verification_token",
              "two_factor_token",
              "password_reset_token",
              "two_factor_confirmation",
            ].map(model => (
              <CommandItem
                key={model}
                value={model}
                onSelect={() => {
                  runCommand(() => handleSearch(model));
                }}
              >
                <Table2Icon className="mr-2 h-4 w-4" />
                {model}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
