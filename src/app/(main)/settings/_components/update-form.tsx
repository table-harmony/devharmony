"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAction } from "next-safe-action/hooks";
import { updateUserAction } from "../actions";
import { updateSchema } from "./validation";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/ui/loader-button";
import { KeyRoundIcon } from "lucide-react";

export const UpdateForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { execute, status } = useAction(updateUserAction, {
    onSuccess() {
      form.reset();
      toast({
        variant: "success",
        description: "Your password has been updated!",
      });
    },
    onError(error) {
      toast({
        variant: "destructive",
        description: error.serverError,
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className="space-y-2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={status === "executing"}
                  placeholder="******"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={status === "executing"}
                  placeholder="******"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton
          isLoading={status === "executing"}
          icon={KeyRoundIcon}
          type="submit"
          className="w-full"
        >
          Update password
        </LoaderButton>
      </form>
    </Form>
  );
};
