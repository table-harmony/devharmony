"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/error-message";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { deleteAction } from "../_actions/delete.action";

export const DeleteForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    setError("");

    startTransition(() => {
      deleteAction()
        .then((data) => {
          if (data?.error) setError(data.error);
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <>
      <Card>
        <CardHeader>Delete Account</CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={onSubmit}>
            <Button
              variant="destructive"
              className="w-full"
              type="submit"
              disabled={isPending}
            >
              Delete
            </Button>
            <ErrorMessage message={error} />
          </form>
        </CardContent>
        <CardFooter>
          <p className="font-medium text-sm text-muted-foreground">
            This action is not revertable.
          </p>
        </CardFooter>
      </Card>
    </>
  );
};
