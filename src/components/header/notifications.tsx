"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellIcon } from "lucide-react";

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="notifications"
        >
          <BellIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <h4 className="p-4 text-lg font-medium leading-none">Notifications</h4>
      </PopoverContent>
    </Popover>
  );
}
