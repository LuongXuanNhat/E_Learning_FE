import { Editor } from "@tiptap/core";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import { useEffect, useRef, useState } from "react";
import LinkModal from "./modelLink";
import StarterKit from "@tiptap/starter-kit";
import { button } from "@material-tailwind/react";
export default function EditorHTML({
  onContentChange,
}: {
  onContentChange: (html: string) => void;
}) {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  useEffect(() => {
    const newEditor = new Editor({
      element: document.querySelector(
        "#hs-editor-tiptap [data-hs-editor-field]"
      ) as HTMLElement,
      extensions: [
        StarterKit.configure({
          blockquote: false,
          paragraph: false,
          bold: false,
          bulletList: false,
          orderedList: false,
        }),
        Placeholder.configure({
          placeholder: "Play around with the editor...",
          emptyNodeClass: "text-gray-600",
        }),
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
      ],

      content: "",
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onContentChange(html);
      },
    });
    setEditor(newEditor);
  }, []);
  useEffect(() => {
    if (!editor) return;

    const actions = [
      {
        id: "#hs-editor-tiptap [data-hs-editor-bold]",
        fn: () => editor.chain().focus().toggleBold().run(),
      },
      {
        id: "#hs-editor-tiptap [data-hs-editor-italic]",
        fn: () => editor.chain().focus().toggleItalic().run(),
      },
      {
        id: "#hs-editor-tiptap [data-hs-editor-underline]",
        fn: () => editor.chain().focus().toggleUnderline().run(),
      },
      {
        id: "#hs-editor-tiptap [data-hs-editor-link]",
        fn: () => setShowLinkModal(true),
      },
      {
        id: "#hs-editor-tiptap [data-hs-editor-ol]",
        fn: () => editor.chain().focus().toggleOrderedList().run(),
      },
      {
        id: "#hs-editor-tiptap [data-hs-editor-ul]",
        fn: () => editor.chain().focus().toggleBulletList().run(),
      },
      {
        id: "#hs-editor-tiptap [data-hs-editor-blockquote]",
        fn: () => editor.chain().focus().toggleBlockquote().run(),
      },
    ];
    actions.forEach(({ id, fn }) => {
      const action = document.querySelector(id);
      if (action) {
        action.addEventListener("click", fn);
      }
    });
  }, [editor]);

  const handleLinkSubmit = (url: any) => {
    if (editor && url) {
      console.log(1111);
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
    setShowLinkModal(false);
  };
  return (
    <div className="w-full overflow-auto rounded-xl border border-gray-300 bg-white">
      <div id="hs-editor-tiptap">
        <div className="m-1 flex items-center gap-0.5 rounded-lg bg-gray-100 p-1">
          <button
            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-hs-editor-bold
          >
            <svg
              width="20px"
              height="20px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
            >
              <path
                d="M12 11.6667H8M12 11.6667C12 11.6667 15.3333 11.6667 15.3333 8.33333C15.3333 5.00002 12 5 12 5C12 5 12 5 12 5H8.6C8.26863 5 8 5.26863 8 5.6V11.6667M12 11.6667C12 11.6667 16 11.6667 16 15.3333C16 19 12 19 12 19C12 19 12 19 12 19H8.6C8.26863 19 8 18.7314 8 18.4V11.6667"
                stroke="currentColor"
                strokeWidth="1.5"
              ></path>
            </svg>
          </button>
          <button
            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-hs-editor-italic
          >
            <svg
              width="20px"
              height="20px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
            >
              <path
                d="M11 5L14 5M17 5L14 5M14 5L10 19M10 19L7 19M10 19L13 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <button
            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-hs-editor-underline
          >
            <svg
              width="20px"
              height="20px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
            >
              <path
                d="M16 5V11C16 13.2091 14.2091 15 12 15V15C9.79086 15 8 13.2091 8 11V5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M6 19L18 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>

          <button
            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-hs-editor-link
          >
            <svg
              width="20px"
              height="20px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
            >
              <path
                d="M14 11.9976C14 9.5059 11.683 7 8.85714 7C8.52241 7 7.41904 7.00001 7.14286 7.00001C4.30254 7.00001 2 9.23752 2 11.9976C2 14.376 3.70973 16.3664 6 16.8714C6.36756 16.9525 6.75006 16.9952 7.14286 16.9952"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M10 11.9976C10 14.4893 12.317 16.9952 15.1429 16.9952C15.4776 16.9952 16.581 16.9952 16.8571 16.9952C19.6975 16.9952 22 14.7577 22 11.9976C22 9.6192 20.2903 7.62884 18 7.12383C17.6324 7.04278 17.2499 6.99999 16.8571 6.99999"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <button
            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-hs-editor-ol
          >
            <svg
              width="20px"
              height="20px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
            >
              <path
                d="M8 6L20 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M4 6.01L4.01 5.99889"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M4 12.01L4.01 11.9989"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M4 18.01L4.01 17.9989"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M8 12L20 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M8 18L20 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <button
            className="relative grid h-10 max-h-[40px] w-10 max-w-[40px] select-none place-items-center rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-hs-editor-ul
          >
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="currentColor"
            >
              <path
                d="M9 5L21 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M5 7L5 3L3.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M5.5 14L3.5 14L5.40471 11.0371C5.46692 10.9403 5.50215 10.8268 5.47709 10.7145C5.41935 10.4557 5.216 10 4.5 10C3.50001 10 3.5 10.8889 3.5 10.8889C3.5 10.8889 3.5 10.8889 3.5 10.8889L3.5 11.1111"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M4 19L4.5 19C5.05228 19 5.5 19.4477 5.5 20V20C5.5 20.5523 5.05228 21 4.5 21L3.5 21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3.5 17L5.5 17L4 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M9 12L21 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M9 19L21 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
        <div
          data-hs-editor-field
          className="p-2 [&_*]:outline-none min-h-[280px] max-h-[480px] overflow-clip"
        ></div>
      </div>
      <LinkModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onSubmit={handleLinkSubmit}
      />
    </div>
  );
}
