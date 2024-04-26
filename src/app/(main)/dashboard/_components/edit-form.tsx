"use client";

import { UserDto } from "@/infrastructure/users";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SuccessMessage } from "@/components/success-message";
import { ErrorMessage } from "@/components/error-message";
import { Row } from "@tanstack/react-table";
import { editAction } from "../_actions/edit.action";

interface EditUserFormProps {
  row: Row<UserDto>;
}

export const EditSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
});

export function EditUserForm({ row }: EditUserFormProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof EditSchema>>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      role: row.getValue("role"),
    },
  });

  const onSubmit = (values: z.infer<typeof EditSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      editAction(row.getValue("id"), values)
        .then((data) => {
          if (data.error) setError(data.error);
          if (data.success) setSuccess(data.success);
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-full justify-start">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
          <DialogDescription>
            Make changes to this account here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div>
                    <FormLabel>Role</FormLabel>
                  </div>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-8 w-[100px]">
                        <SelectValue placeholder={row.getValue("role")} />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {["ADMIN", "USER"].map((role) => (
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
            <ErrorMessage message={error} />
            <SuccessMessage message={success} />
            <DialogFooter>
              <Button disabled={isPending} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
