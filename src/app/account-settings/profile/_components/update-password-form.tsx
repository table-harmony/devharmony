"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useServerAction } from "zsa-react";
import { updatePasswordAction } from "../actions";

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

const updatePasswordSchema = z.object({
  password: z.string().min(5),
});

export function UpdatePasswordForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const { execute, isPending } = useServerAction(updatePasswordAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
      form.reset();
    },
    onSuccess() {
      toast({
        description: "Password successfully updated!",
        variant: "success",
      });
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof updatePasswordSchema>) {
    execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="******" type="password" />
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
