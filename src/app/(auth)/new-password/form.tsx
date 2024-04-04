"use client";

import * as z from "zod";
import { NewPasswordSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState, useTransition } from "react";
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
import { ErrorMessage } from "@/components/error-message";
import { SuccessMessage } from "@/components/success-message";

import { newPasswordAction } from "./action";

export const NewPasswordForm = () => {
  const FormComponent = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
      resolver: zodResolver(NewPasswordSchema),
      defaultValues: {
        password: "",
      },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
      setError("");
      setSuccess("");

      startTransition(() => {
        newPasswordAction(values, token)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
            }
          })
          .catch(() => setError("Something went wrong!"));
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
          <ErrorMessage message={error} />
          <SuccessMessage message={success} />
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
