import { useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Document } from "~/shared/types"
import { useNavigate } from "react-router-dom"

export const CreateDocument = () => {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {
        isPending: isCreatingNewDocument,
        mutateAsync: createDocument
    } = useMutation({
        mutationFn: async () => {

            const response = await window.api.createDocument()

            return response.data
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["documents"], (documents: Document[]) => {
                return [...documents, data]
            })

            navigate(`/documents/${data.id}`)
        }
    })

    useEffect(() => {

        function onNewDocument() {
            createDocument()
        }

        const unsubscribe = window.api.onNewDocumentRequest(onNewDocument)

        return () => {
            unsubscribe()
        }
    }, [createDocument])

    return (
        <Button
            onClick={() => createDocument()}
            disabled={isCreatingNewDocument}
            className="w-full rounded-none bg-transparent justify-start gap-3 hover:bg-rotion-800 border-t border-rotion-400"
        >
            <Plus />
            <span>
                Criar novo documento
            </span>
        </Button>
    )
}