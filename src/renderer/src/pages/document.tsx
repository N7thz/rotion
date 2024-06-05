import { TocLink, TocRoot, TocSection } from "@/components/ToC"
import { Editor } from "@/components/editor"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useParams } from "react-router-dom"

export const Document = () => {

    const { id } = useParams<{ id: string }>()

    console.log(id)

    const { data, isFetching } = useQuery({
        queryKey: ["document"],
        queryFn: async () => {

            const response = await window.api.fetchDocuments({ id: id! })

            return response.data
        },
    })

    console.log("dados",data)

    const initialContent = useMemo(() => {

        if (data) {
            return `<h1>${data.title}${data.content ?? <p />}</h1>`
        }

        return ""

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
