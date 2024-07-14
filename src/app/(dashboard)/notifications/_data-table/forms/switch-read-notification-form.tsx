"use client";

import { useServerAction } from "zsa-react";
import { switchReadNotificationAction } from "../actions";

import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/loader-button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function SwitchReadNotificationForm({
  notificationId,
  isRead,
}: {
  notificationId: number;
  isRead: boolean;
}) {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(switchReadNotificationAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess() {
      toast({
        description: "Notification updated!",
        variant: "success",
      });
    },
  });

  return (
    <LoaderButton
      isLoading={isPending}
      icon={
        isRead ? (
          <EyeIcon className="size-4" />
        ) : (
          <EyeOffIcon className="size-4" />
        )
      }
      variant="ghost"
      onClick={() => execute({ notificationId, isRead })}
    >
      <span className="sr-only">Switch read</span>
    </LoaderButton>
  );
}
