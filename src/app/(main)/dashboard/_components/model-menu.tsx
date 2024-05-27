"use client";

import { useRouter } from "next/navigation";
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
import { LayoutGridIcon, Table2Icon } from "lucide-react";

export function ModelMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
              "session",
              "verification_token",
              "magic_link_token",
            ].map((model) => (
              <CommandItem
                key={model}
                value={model}
                onSelect={() => {
                  runCommand(() => router.push("/dashboard/" + model));
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
