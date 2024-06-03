import Highlight from "@tiptap/extension-highlight"
import StarterKit from "@tiptap/starter-kit"
import { EditorContent, useEditor } from "@tiptap/react"
import Typography from "@tiptap/extension-typography"
import Placeholder from "@tiptap/extension-placeholder"
import Document from "@tiptap/extension-document"

export const Editor = () => {

    const editor = useEditor({
        extensions: [
            Highlight,
            Typography,
            Document.extend({
                content: "heading block*"
            }),
            StarterKit.configure({
                document: false
            }),
            Placeholder.configure({
                placeholder: "Untitled",
                emptyEditorClass: "before:content-[attr(data-placeholder)] before:text-gray-500 brfore:h-0 before:float-left before:pointer-events-none"
            }),
        ],
        content:
            "<h1>Back-end</h1><p>Esse é um documento que explica sobre back-end</p>",
        autofocus: "end",
        editorProps: {
            attributes: {
                class: "focus:outline-none prose prose-invert prose-headings:mt-0"
            }
        }
    })

    return (
        <EditorContent
            editor={editor}
            className="w-[65ch]"
        />
    )
}
