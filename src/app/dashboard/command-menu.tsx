"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  ComputerIcon,
  LayoutDashboardIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <LayoutDashboardIcon className="mr-2 size-4" />
        Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandSeparator />
          <CommandGroup heading="Tables">
            <CommandItem
              onSelect={() => runCommand(() => router.push("users"))}
            >
              <UsersIcon className="mr-2 size-4" />
              Users
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("verification-tokens"))
              }
            >
              <ShieldIcon className="mr-2 size-4" />
              Verification tokens
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("sessions"))}
            >
              <ComputerIcon className="mr-2 size-4" />
              Sessions
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
