"use client";

import { useTransition } from "react";

import { logoutAction } from "./actions";

import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/ui/button";

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
          }),
        );
    });
  };

  return (
    <div className="container relative space-y-6 md:max-w-lg 2xl:max-w-xl">
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
