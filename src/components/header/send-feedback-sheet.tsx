"use client";

import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderButton } from "@/components/loader-button";

const LABELS = [
  "Issue",
  "Idea",
  "Question",
  "Complaint",
  "Feature request",
  "Other",
];

const formSchema = z.object({
  title: z.string({
    message: "Title is required",
  }),
  label: z.string(),
  message: z.string({
    message: "Message is required",
  }),
});

function SendFeedbackForm({
  setShowSheet,
}: {
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const createFeedback = useMutation(api.feedbacks.createFeedback);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      label: LABELS[0],
      message: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createFeedback(values);
      toast({ description: "Feedback sent!", variant: "success" });
    } catch (error) {
      console.error(error);
      toast({ description: "Something went wrong", variant: "destructive" });
    }

    form.reset();
    setShowSheet(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Add dark mode"
                  disabled={isLoading}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem {...field}>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LABELS.map((label) => (
                      <SelectItem key={label} value={label}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="h-[200px]"
                  placeholder="Please add a dark mode to the app."
                  disabled={isLoading}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full sm:justify-end">
          <LoaderButton isLoading={isLoading} className="w-full sm:w-auto">
            Send
          </LoaderButton>
        </div>
      </form>
    </Form>
  );
}

export function SendFeedbackSheet({ children }: { children: ReactNode }) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Feedback </SheetTitle>
          <SheetDescription>
            We value your feedback. How can we improve your experience?
          </SheetDescription>
        </SheetHeader>
        <SendFeedbackForm setShowSheet={setShowSheet} />
      </SheetContent>
    </Sheet>
  );
}
