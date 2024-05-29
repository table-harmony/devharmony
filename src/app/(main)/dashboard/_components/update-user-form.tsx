"use client";

import { UserDto } from "@/infrastructure/users";

import { updateUserAction } from "../actions";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { Row } from "@tanstack/react-table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/ui/loader-button";
import { SaveIcon } from "lucide-react";

export const schema = z.object({
  role: z.enum(["member", "manager", "admin"]),
});

export function UpdateUserForm({ row }: { row: Row<UserDto> }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: row.getValue("role"),
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    startTransition(() => {
      updateUserAction(row.getValue("id"), values.role)
        .then((data) => {
          if (data?.error)
            toast({ variant: "destructive", description: data.error });
          if (data?.success)
            toast({ variant: "success", description: data.success });
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-full justify-start">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Account</DialogTitle>
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
            <LoaderButton
              isLoading={isPending}
              icon={SaveIcon}
              className="w-full"
            >
              Save changes
            </LoaderButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
