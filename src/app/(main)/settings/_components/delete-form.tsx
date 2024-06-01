"use client";

import { useTransition } from "react";

import { deleteUserAction } from "../actions";

import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/ui/loader-button";

import { Trash2Icon } from "lucide-react";

export const DeleteForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onSubmit = () => {
    startTransition(() => {
      deleteUserAction()
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
    <form action={onSubmit} className="space-y-2">
      <LoaderButton
        isLoading={isPending}
        icon={Trash2Icon}
        type="submit"
        className="w-full"
        variant="destructive"
      >
        Delete
      </LoaderButton>
    </form>
  );
};
