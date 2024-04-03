"use client";

import { useState } from "react";
import { useCurrentRole } from "@/hooks/use-current-role";
import Link from "next/link";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export const Search = () => {
  const [open, setOpen] = useState(false);
  const role = useCurrentRole();

  const Item = ({ title, to }: { title: string; to: string }) => {
    return (
      <Link href={to} onClick={() => setOpen(false)}>
        <CommandItem className="capitalize">{title}</CommandItem>
      </Link>
    );
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-[400px]"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="mr-2 w-4 h-4" />
        Search
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Main pages">
            <Item title="home" to="/" />
            <Item title="information" to="/information" />
          </CommandGroup>
          {role == "ADMIN" && (
            <CommandGroup heading="Admin">
              <Item title="admin" to="/admin" />
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
