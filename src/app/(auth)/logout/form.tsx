"use client";

import { useTransition } from "react";

import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/loader-button";
import { logoutAction } from "./actions";
import { LogOutIcon } from "lucide-react";

export const LogoutForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onSubmit = () => {
    startTransition(() => {
      logoutAction()
        .then((data) => {
          if (data?.error)
            toast({ variant: "destructive", description: data.error });
        })
        .catch(() =>
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          })
        );
    });
  };

  return (
    <div className="container relative md:max-w-lg 2xl:max-w-xl space-y-6">
      <form action={onSubmit} className="space-y-2">
        <LoaderButton
          isLoading={isPending}
          icon={LogOutIcon}
          type="submit"
          className="w-full"
        >
          Logout
        </LoaderButton>
      </form>
    </div>
  );
};
