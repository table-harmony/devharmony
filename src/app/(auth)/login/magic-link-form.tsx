"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useServerAction } from "zsa-react";
import { magicLinkLoginAction } from "./actions";

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

const magicLinkSchema = z.object({
  email: z.string().email(),
});

export function MagicLinkForm() {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(magicLinkLoginAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
    },
  });

  const form = useForm<z.infer<typeof magicLinkSchema>>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof magicLinkSchema>) {
    execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your email" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton className="w-full" isLoading={isPending}>
          Sign in with magic link
        </LoaderButton>
      </form>
    </Form>
  );
}
