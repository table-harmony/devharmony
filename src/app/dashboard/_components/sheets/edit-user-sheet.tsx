"use client";

import type { UserId } from "@/infrastructure/users";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useServerAction } from "zsa-react";
import { editUserAction } from "../../actions";

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
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/loader-button";

const formSchema = z.object({
  role: z.enum(["member", "manager", "admin"]),
});

function EditUserForm({
  userId,
  setShowSheet,
}: {
  userId: UserId;
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(editUserAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess() {
      toast({ description: "User successfully edited!", variant: "success" });
    },
    onFinish() {
      setShowSheet(false);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    execute({ userId, ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-8 w-[100px]">
                    <SelectValue placeholder="member" />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {["member", "manager", "admin"].map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex w-full sm:justify-end">
          <LoaderButton isLoading={isPending} className="w-full sm:w-auto">
            Save
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}

export function EditUserSheet({
  userId,
  children,
}: {
  userId: UserId;
  children: ReactNode;
}) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit user</SheetTitle>
          <SheetDescription>
            Fill in the details below to edit user.
          </SheetDescription>
        </SheetHeader>
        <EditUserForm userId={userId} setShowSheet={setShowSheet} />
      </SheetContent>
    </Sheet>
  );
}
