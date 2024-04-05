"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { runQueryAction } from "../_actions/console.action";

export default function Console() {
  const [res, setRes] = useState();
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const onSubmit = (query: string) => {
    startTransition(() => {
      runQueryAction(query)
        .then((data) => {
          if (data.res) setRes(data.res);
          if (data.error) setError(data.error);
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <div className="grid w-full gap-1.5">
      <AlertDialog open={!!error}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>The action threw an error!</AlertDialogTitle>
            <AlertDialogDescription>{error}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setError("")}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Label htmlFor="console">Your SQL query</Label>
      <Textarea
        placeholder="Type your query here."
        id="console"
        className="resize-none"
        disabled={isPending}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Button onClick={() => onSubmit(query)} disabled={isPending}>
        Run query
      </Button>
      <p className="text-sm text-muted-foreground">
        The result of the SQL query:
      </p>
      <Separator />
      <ScrollArea className="h-32 text-sm text-muted-foreground">
        <pre>{JSON.stringify(res, null, 2)}</pre>
      </ScrollArea>
    </div>
  );
}
