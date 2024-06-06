import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Document } from "~/shared/types"

export const CreateDocument = () => {

    const queryClient = useQueryClient()

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
        }
    })

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