"use client";

import { useServerAction } from "zsa-react";
import { deleteNotificationAction } from "../actions";

import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/loader-button";
import { TrashIcon } from "lucide-react";

export function DeleteNotificationForm({
  notificationId,
}: {
  notificationId: number;
}) {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(deleteNotificationAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess() {
      toast({
        description: "Notification successfully deleted!",
        variant: "success",
      });
    },
  });

  return (
    <LoaderButton
      isLoading={isPending}
      icon={<TrashIcon className="size-4" />}
      variant="ghost"
      onClick={() => execute({ notificationId })}
    >
      <span className="sr-only">Delete</span>
    </LoaderButton>
  );
}
