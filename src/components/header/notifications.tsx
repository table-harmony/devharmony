"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BellIcon, EyeIcon } from "lucide-react";
import { Notification } from "@/db/schema";
import { useServerAction } from "zsa-react";
import { useState } from "react";
import { markNotificationAsReadAction } from "./actions";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Notifications({
  notifications,
}: {
  notifications: Notification[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { execute, isPending } = useServerAction(markNotificationAsReadAction);

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
          {notifications.length > 0 && (
            <span className="absolute right-[1px] top-1 size-2 rounded-full bg-blue-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid space-y-4">
        <div className="flex items-center justify-between text-sm font-semibold">
          Notifications
          <Link
            href="/notifications"
            onClick={() => setIsOpen(false)}
            className="text-xs text-primary"
          >
            View all
          </Link>
        </div>
        <Separator />
        <div className="grid text-sm text-muted-foreground">
          {notifications.length === 0 && (
            <div className="m-1 flex items-center justify-center text-xs">
              No unread notifications
            </div>
          )}

          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between hover:!bg-inherit"
            >
              <span className="w-36 truncate">{notification.title}</span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="read"
                disabled={isPending}
                onClick={async () => {
                  await execute({ notificationId: notification.id });
                }}
              >
                <EyeIcon className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
