"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";

import { useServerAction } from "zsa-react";
import { deleteNotificationsAction } from "../actions";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/loader-button";
import { Button } from "@/components/ui/button";

function DeleteNotificationsForm({
  notificationIds,
  setShowSheet,
}: {
  notificationIds: number[];
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(deleteNotificationsAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess() {
      toast({
        description: "Notifications successfully deleted!",
        variant: "success",
      });
    },
    onFinish() {
      setShowSheet(false);
    },
  });

  return (
    <div className="mt-4 flex w-full gap-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowSheet(false)}
      >
        Cancel
      </Button>
      <LoaderButton
        isLoading={isPending}
        className="w-full"
        variant="destructive"
        onClick={() => execute({ notificationIds })}
      >
        Delete
      </LoaderButton>
    </div>
  );
}

export function DeleteNotificationsSheet({
  notificationIds,
}: {
  notificationIds: number[];
}) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>
        <Button variant="destructive">
          Delete {notificationIds.length} notifications
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Delete Notifications</SheetTitle>
          <SheetDescription>
            These notificatiosn will immediately be deleted. Once deleted,
            you&apos;ll no longer be able to view or modify it.
          </SheetDescription>
        </SheetHeader>
        <DeleteNotificationsForm
          notificationIds={notificationIds}
          setShowSheet={setShowSheet}
        />
      </SheetContent>
    </Sheet>
  );
}
