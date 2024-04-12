"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../schemas";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CardWrapper } from "../_components/card-wrapper";
import { Button } from "@/components/ui/button";
import { SuccessMessage } from "@/components/success-message";
import { ErrorMessage } from "@/components/error-message";

import { loginAction } from "./action";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export const LoginForm = () => {
  const FormComponent = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [showTwoFactor, setShowTwoFactor] = useState(false);

    const searchParams = useSearchParams();
    const urlError =
      searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider!"
        : "";

    const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
      setError("");
      setSuccess("");

      startTransition(() => {
        loginAction(values)
          .then((data) => {
            if (data?.error) {
              setError(data.error);
            }

            if (data?.twoFactor) {
              setShowTwoFactor(true);
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
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <InputOTP
                        pattern={REGEXP_ONLY_DIGITS}
                        maxLength={6}
                        disabled={isPending}
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                      <Button
                        variant="link"
                        className="px-0 text-xs font-normal"
                        asChild
                      >
                        <Link href="/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <ErrorMessage message={error || urlError} />
          <SuccessMessage message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    );
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      showSocial
    >
      <Suspense>
        <FormComponent />
      </Suspense>
    </CardWrapper>
  );
};
