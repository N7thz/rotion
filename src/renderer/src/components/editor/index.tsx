import Highlight from "@tiptap/extension-highlight"
import StarterKit from "@tiptap/starter-kit"
import Typography from "@tiptap/extension-typography"
import Placeholder from "@tiptap/extension-placeholder"
import Document from "@tiptap/extension-document"
import {
    useEditor, EditorContent, BubbleMenu, FloatingMenu
} from '@tiptap/react'

import {
    Bold,
    Code,
    Italic,
    Strikethrough,
    ChevronDown,
    MessageSquareText
} from "lucide-react"

import { BubbleButton } from "../bubble-button"

import header from "../../resources/header.png"
import text from "../../resources/text.png"

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

    const handleChangeForBold = () => {

        editor && editor
            .chain()
            .focus()
            .toggleBold()
            .run()
    }

    const handleChangeForItalic = () => {

        editor && editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
    }

    const handleChangeForStrike = () => {

        editor && editor
            .chain()
            .focus()
            .toggleStrike()
            .run()
    }

    const handleChangeForCode = () => {

        editor && editor
            .chain()
            .focus()
            .toggleCode()
            .run()
    }

    const handleChangeForHeader = () => {

        editor && editor
            .chain()
            .focus()
            .toggleHeading({ level: 1 })
            .run()
    }

    return (
        <>
            <EditorContent
                editor={editor}
                className="w-[65ch]"
            />
            {
                editor &&
                <FloatingMenu
                    editor={editor}
                    className="bg-rotion-900 flex flex-col ga-2 shadow-xl border-zinc-50
                    shadow-black/20 rounded-md overflow-hidden"
                    shouldShow={({ state }) => {

                        const { $from } = state.selection

                        const currentLineText = $from.nodeBefore?.textContent

                        return currentLineText === "/"
                    }}
                >
                    <button
                        onClick={handleChangeForHeader}
                        className="flex items-center gap-2 p-2 rounded 
                        hover:bg-rotion-800 min-w-[280-px]"
                    >
                        <img
                            src={text}
                            width={100}
                            height={100}
                            alt="imagem ilustrativa"
                            className="w-12 border-zinc-600 rounded"
                        />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">
                                Header
                            </span>
                            <span className="text-xs text-zinc-400">
                                Big section heading.
                            </span>
                        </div>
                    </button>

                    <button
                        className="flex items-center gap-2 p-2 rounded 
                        hover:bg-rotion-800 min-w-[280-px]"
                    >
                        <img
                            src={header}
                            width={100}
                            height={100}
                            alt="imagem ilustrativa"
                            className="w-12 border-zinc-600 rounded"
                        />
                        <div className="flex flex-col text-left">
                            <span className="text-sm">
                                Text
                            </span>
                            <span className="text-xs text-zinc-400">
                                Just start writing with plain text.
                            </span>
                        </div>
                    </button>
                </FloatingMenu>
            }
            {
                editor &&
                <BubbleMenu
                    editor={editor}
                    className="bg-rotion-800 flex shadow-xl border-rotion-500
                        shadow-black/20 rounded-sm overflow-hidden divide-x divide-rotion-500"
                >

                    <BubbleButton>
                        Text
                        <ChevronDown className="w-4 h-4" />
                    </BubbleButton>

                    <BubbleButton>
                        Comment
                        <MessageSquareText className="w-4 h-4" />
                    </BubbleButton>

                    <div className="flex items-center">

                        <BubbleButton
                            onClick={handleChangeForBold}
                            data-active={editor.isActive('bold')}
                        >
                            <Bold className="w-4 h-4" />
                        </BubbleButton>

                        <BubbleButton
                            onClick={handleChangeForItalic}
                            data-active={editor.isActive('italic')}
                        >
                            <Italic className="w-4 h-4" />
                        </BubbleButton>

                        <BubbleButton
                            onClick={handleChangeForStrike}
                            data-active={editor.isActive('strike')}
                        >
                            <Strikethrough className="w-4 h-4" />
                        </BubbleButton>

                        <BubbleButton
                            onClick={handleChangeForCode}
                            data-active={editor.isActive('code')}
                        >
                            <Code className="w-4 h-4" />
                        </BubbleButton>
                    </div>
                </BubbleMenu>
            }
        </>
    )
}