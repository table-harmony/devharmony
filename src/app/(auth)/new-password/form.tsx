"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useServerAction } from "zsa-react";
import { newPasswordAction } from "./actions";

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

const newPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(5),
});

export function NewPasswordForm({ token }: { token: string }) {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(newPasswordAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
      form.reset();
    },
    onSuccess() {
      toast({ description: "Password successfully updated!" });
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      token,
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="******" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton className="w-full" isLoading={isPending}>
          Reset password
        </LoaderButton>
      </form>
    </Form>
  );
}
