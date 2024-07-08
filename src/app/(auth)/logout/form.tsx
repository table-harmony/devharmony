"use client";

import { logoutAction } from "./actions";
import { useServerAction } from "zsa-react";

import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/loader-button";
import { LogOutIcon } from "lucide-react";

export const LogoutForm = () => {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(logoutAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
    },
  });

  const onSubmit = () => {
    execute();
  };

  return (
    <form action={onSubmit}>
      <LoaderButton
        isLoading={isPending}
        icon={<LogOutIcon className="size-4" />}
        className="px-8"
      >
        Logout
      </LoaderButton>
    </form>
  );
};
