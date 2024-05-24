"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

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
import { LoaderButton } from "@/components/loader-button";
import { LinkIcon } from "lucide-react";

const schema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export const MagicLinkForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    startTransition(async () => {
      await timeout(1000);
      toast({
        title: "Magic link in construction",
        variant: "success",
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="john.doe@example.com"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton
          isLoading={isPending}
          icon={LinkIcon}
          type="submit"
          className="w-full"
        >
          <span className="hidden md:block">Sign in with&nbsp;</span> Magic link
        </LoaderButton>
      </form>
    </Form>
  );
};
