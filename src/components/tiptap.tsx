"use client";

import { Button } from "@/components/ui/button";

import { useCurrentEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";

import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";

export const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="mb-4 flex w-full flex-wrap gap-2">
      <Button
        variant="outline"
        aria-label="Bold"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-muted" : ""}
      >
        <Bold className="size-5" />
      </Button>
      <Button
        variant="outline"
        aria-label="Italic"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-muted" : ""}
      >
        <Italic className="size-5" />
      </Button>
      <Button
        variant="outline"
        aria-label="Heading 1"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}
      >
        <Heading1 className="size-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
      >
        <Heading2 className="size-5" />
      </Button>
      <Button
        variant="outline"
        aria-label="Heading 3"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""}
      >
        <Heading3 className="size-5" />
      </Button>
      <Button
        variant="outline"
        aria-label="Heading 4"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "bg-muted" : ""}
      >
        <Heading4 className="size-5" />
      </Button>
      <Button
        variant="outline"
        aria-label="Heading 5"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "bg-muted" : ""}
      >
        <Heading5 className="size-5" />
      </Button>
      <Button
        variant="outline"
        aria-label="Heading 6"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "bg-muted" : ""}
      >
        <Heading6 className="size-5" />
      </Button>
      <Button
        variant="outline"
        aria-label="List"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-muted" : ""}
      >
        <List className="size-5" />
      </Button>
      <Button
        variant="outline"
        aria-label="List ordered"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-muted" : ""}
      >
        <ListOrdered className="size-5" />
      </Button>
    </div>
  );
};

export const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];
