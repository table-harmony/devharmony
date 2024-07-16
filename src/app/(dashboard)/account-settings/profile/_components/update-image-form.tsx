"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useServerAction } from "zsa-react";
import { updateImageAction } from "../actions";

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
import { MAX_UPLOAD_IMAGE_SIZE } from "@/lib/files";

const updateImageSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size < MAX_UPLOAD_IMAGE_SIZE, {
    message: "Your image must be less than 1MB.",
  }),
});

export function UpdateImageForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateImageSchema>>({
    resolver: zodResolver(updateImageSchema),
    defaultValues: {},
  });

  const { execute, isPending } = useServerAction(updateImageAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess() {
      toast({
        description: "Image successfully updated!",
        variant: "success",
      });
    },
    onFinish() {
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof updateImageSchema>) {
    const formData = new FormData();
    formData.append("file", values.file!);

    execute({ fileWrapper: formData });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-md gap-2 space-y-2"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Image</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton isLoading={isPending}>Upload</LoaderButton>
      </form>
    </Form>
  );
}
