"use client";

import * as z from "zod";
import { NewPasswordSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { Suspense, useTransition } from "react";
import { useSearchParams } from "next/navigation";
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
import { CardWrapper } from "../_components/card-wrapper";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { newPasswordAction } from "./action";

export const NewPasswordForm = () => {
  const FormComponent = () => {
    const [isPending, startTransition] = useTransition();

    const { toast } = useToast();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
      resolver: zodResolver(NewPasswordSchema),
      defaultValues: {
        password: "",
      },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
      startTransition(() => {
        newPasswordAction(values, token)
          .then((data) => {
            if (data?.error) {
              form.reset();
              toast({
                variant: "destructive",
                description: data.error,
              });
            }

            if (data?.success) {
              form.reset();
              toast({ description: data.success });
            }
          })
          .catch(() =>
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })
          );
      });
    };

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            Reset password
          </Button>
        </form>
      </Form>
    );
  };

  return (
    <CardWrapper
      headerLabel="Reset password"
      backButtonLabel="Back to login"
      backButtonHref="/api/auth/signin"
    >
      <Suspense>
        <FormComponent />
      </Suspense>
    </CardWrapper>
  );
};
