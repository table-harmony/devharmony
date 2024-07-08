"use client";

import { useServerAction } from "zsa-react";
import { invalidateUserSessionsAction } from "./actions";

import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";
import { LogOutIcon } from "lucide-react";

export function LogoutButton() {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(invalidateUserSessionsAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
    },
  });

  const onSubmit = () => {
    execute();
  };

  return (
    <LoaderButton
      onClick={onSubmit}
      icon={<LogOutIcon className="size-4" />}
      isLoading={isPending}
    >
      Logout Sessions
    </LoaderButton>
  );
}
