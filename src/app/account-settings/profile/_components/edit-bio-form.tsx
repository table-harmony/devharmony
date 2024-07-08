"use client";

import "@/styles/tiptap.css";

import { useRef } from "react";

import { useServerAction } from "zsa-react";
import { updateBioAction } from "../actions";

import { useSession } from "@/components/session-provider";
import { MenuBar, extensions } from "@/components/tiptap";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";

import { EditorProvider } from "@tiptap/react";

export function EditBioForm() {
  const { user } = useSession();
  const htmlRef = useRef<string>(user?.bio ?? "");
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(updateBioAction, {
    onError({ err }) {
      toast({ description: err.message, variant: "destructive" });
    },
    onSuccess() {
      toast({ description: "Bio successfully updated!", variant: "success" });
    },
  });

  function onSubmit() {
    execute({ bio: htmlRef.current });
  }

  return (
    <div className="w-full space-y-4">
      <EditorProvider
        onUpdate={({ editor }) => {
          htmlRef.current = editor.getHTML();
        }}
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={user?.bio}
        editable={true}
      />

      <div className="flex justify-end">
        <LoaderButton
          onClick={onSubmit}
          isLoading={isPending}
          className="self-end"
        >
          Save Changes
        </LoaderButton>
      </div>
    </div>
  );
}
