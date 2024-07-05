"use client";

import { useServerAction } from "zsa-react";
import { deleteSessionAction } from "../actions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

export function DeleteSessionAlert({
  sessionId,
  children,
}: {
  sessionId: string;
  children: React.ReactNode;
}) {
  const { toast } = useToast();

  const { execute } = useServerAction(deleteSessionAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess() {
      toast({
        description: "Session successfully deleted!",
        variant: "success",
      });
    },
  });

  function onSubmit() {
    execute({ sessionId });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the session and remove the data from
            the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
