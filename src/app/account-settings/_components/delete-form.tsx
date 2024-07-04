"use client";

import { deleteAction } from "../actions";
import { useServerAction } from "zsa-react";

import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/loader-button";

export const DeleteForm = () => {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(deleteAction, {
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
        variant="destructive"
        className="w-full md:w-fit"
        isLoading={isPending}
      >
        Delete
      </LoaderButton>
    </form>
  );
};
