import { useMemo } from "react"
import { TocLink, TocRoot, TocSection } from "@/components/ToC"
import { Editor } from "~/renderer/src/components/editor"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

interface OnContentUpdateParams {
    title: string
    content: string
}

interface IPCDocument {
    id: string
}

export const Document = () => {

    const queryClient = useQueryClient()

    const { id } = useParams<{ id: string }>()

    const { data, isFetching } = useQuery({
        queryKey: ["document", id],
        queryFn: async () => {

            const response = await window.api.fetchDocument({ id: id! })

            console.log(response.data)

            return response.data
        },
        refetchOnWindowFocus: false
    })

    const { mutateAsync: saveDocument } = useMutation({
        mutationFn: async ({ content, title }: OnContentUpdateParams) => {

            await window.api.saveDocument({
                id: id!,
                title,
                content
            })
        },
        onSuccess: (_, { title }) => {
            queryClient.setQueryData(
                ["documents"],
                (documents: IPCDocument[]) => {
                    return documents.map(document => {
                        if (document.id) {
                            return {...document, title}
                        }
                    })
                }
            )
        }
    })

    const initialContent = useMemo(() => {

        if (!data) {
            return "<p />"
        }

        return `<h1>${data.title}</h1>${data.content ?? "<p />"}`
    }, [data])

    return (
        <main
            className="flex-1 flex py-12 px-10 gap-8"
        >
            <aside className="hidden lg:block sticky top-0">
                <span className="text-rotion-300 font-semibold text-lg">
                    TABLE OF CONTENT
                </span>

                <TocRoot>
                    <TocLink to={"#"}>Back-end</TocLink>
                    <TocSection>
                        <TocLink to={"#"}>Banco de dados</TocLink>
                        <TocLink to={"#"}>Autenticação</TocLink>
                    </TocSection>
                </TocRoot>
            </aside>

            <section className="flex-1 flex flex-col">
                {
                    !isFetching && data &&
                    <Editor content={initialContent} />
                }
            </section>
        </main>
    )
}
