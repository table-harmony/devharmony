"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useServerAction } from "zsa-react";
import { updateNameAction } from "../actions";

import { useSession } from "@/components/providers/session-provider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/loader-button";

const updateNameSchema = z.object({
  name: z.string(),
});

export function UpdateNameForm() {
  const { toast } = useToast();
  const { user } = useSession();

  const form = useForm<z.infer<typeof updateNameSchema>>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name: user?.name,
    },
  });

  const { execute, isPending } = useServerAction(updateNameAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
      form.reset();
    },
    onSuccess() {
      toast({ description: "Name successfully updated!", variant: "success" });
    },
  });

  function onSubmit(values: z.infer<typeof updateNameSchema>) {
    execute(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-md gap-2 space-y-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton isLoading={isPending}>Save</LoaderButton>
      </form>
    </Form>
  );
}
