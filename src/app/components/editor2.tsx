"use client";

import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Underline from "@tiptap/extension-underline";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const EditorHTML2 = ({
  onContentChange,
}: {
  onContentChange: (html: string) => void;
}) => {
  const editor = new Editor({
    extensions: [
      StarterKit,
      Paragraph.configure({
        HTMLAttributes: {
          class: "text-gray-600",
        },
      }),
      Bold.configure({
        HTMLAttributes: {
          class: "font-bold",
        },
      }),
      Underline,
      Link.configure({
        HTMLAttributes: {
          class:
            "inline-flex items-center gap-x-1 text-blue-500 decoration-2 hover:underline font-medium",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc list-inside text-gray-800",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal list-inside text-gray-800",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "text-gray-800 sm:text-xl",
        },
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange(html);
    },
  });

  return <EditorContent editor={editor} />;
};

export default EditorHTML2;
