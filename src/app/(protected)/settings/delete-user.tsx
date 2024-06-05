"use client";

import { useTransition } from "react";

import { deleteUserAction } from "./actions";

import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export const DeleteForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onSubmit = () => {
    startTransition(() => {
      deleteUserAction().then((data) => {
        if (data?.error)
          toast({ variant: "destructive", description: data.error });
      });
    });
  };

  return (
    <form action={onSubmit}>
      <LoaderButton
        isLoading={isPending}
        icon={Trash2Icon}
        type="submit"
        variant="destructive"
      >
        Delete
      </LoaderButton>
    </form>
  );
};
