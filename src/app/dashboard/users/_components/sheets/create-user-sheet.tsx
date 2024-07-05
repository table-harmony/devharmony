"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useServerAction } from "zsa-react";
import { createUserAction } from "../../actions";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

const formSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(5, {
    message: "Password is required",
  }),
});

function CreateUserForm({
  setShowSheet,
}: {
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(createUserAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess() {
      toast({ description: "User successfully created!", variant: "success" });
    },
    onFinish() {
      setShowSheet(false);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
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
                  placeholder="Enter your email"
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
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full sm:justify-end">
          <LoaderButton isLoading={isPending} className="w-full sm:w-auto">
            Create
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}

export function CreateUserSheet({ children }: { children: ReactNode }) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create user</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new user.
          </SheetDescription>
        </SheetHeader>
        <CreateUserForm setShowSheet={setShowSheet} />
      </SheetContent>
    </Sheet>
  );
}
