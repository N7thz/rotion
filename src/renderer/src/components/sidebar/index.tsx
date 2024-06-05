import { Plus, Search } from "lucide-react"
import { ResizablePanel } from "../ui/resizable"
import { Button } from "../ui/button"
import { ChevronsLeft } from "lucide-react"
import { useCollapse } from "@/context/collapse-context"
import { useQuery } from "@tanstack/react-query"
import { Document } from "~/shared/types"
import { CreateDocument } from "./create-document"
import { TocLink } from "../ToC"

export const SideBar = () => {

    const { setIsCollapsible, panelRef } = useCollapse()

    const handleCollapse = () => {

        if (panelRef.current) panelRef.current.collapse()
    }

    const { data } = useQuery({
        queryKey: ["documents"],
        queryFn: async () => {

            const response = await window.api.fetchAllDocuments()

            console.log(response)

            return response.data
        }
    })

    return (

        <ResizablePanel
            // @ts-ignore
            ref={panelRef}
            collapsible
            defaultSize={25}
            onCollapse={() => setIsCollapsible(true)}
            onExpand={() => setIsCollapsible(false)}
            className="flex flex-col justify-between"
        >
            <div className="space-y-4">
                <div
                    className="w-full flex items-center justify-end p-2"
                >
                    <Button
                        size={"icon"}
                        onClick={handleCollapse}
                        className="bg-transparent"
                    >
                        <ChevronsLeft />
                    </Button>
                </div>

                <Button
                    className="w-full region-drag flex items-center justify-start gap-3 p-3 bg-transparent"
                >
                    <Search
                        size={28}
                        className="bg-rotion-700 p-2 rounded-sm"
                    />
                    <span>
                        Fazer login
                    </span>
                </Button>
                <div className="w-full flex items-center gap-3 p-3">
                    <Search size={20} />
                    <span>
                        Busca rápida
                    </span>
                </div>
                <div className="p-3">
                    <h1 className="text-rotion-300 mb-3">
                        WORKSPACE
                    </h1>
                    <ul className="space-y-1">
                        {data &&
                            data.map(document =>
                                <SideBarItem
                                    key={document.id}
                                    document={document}
                                />
                            )
                        }
                    </ul>
                </div>

            </div>
            <CreateDocument />
        </ResizablePanel >
    )
}

export const SideBarItem = (
    { document: { id, title } }: { document: Document }
) => {

    return (
        <TocLink
            to={`/documents/${id}`}
            className="w-full flex justify-between text-zinc-50/80 items-center cursor-pointer"
        >
            <span>
                {title}
            </span>
            <Button
                variant="ghost" className="hover:bg-transparent hover:scale-125 hover:text-white duration-200"
            >
                ...
            </Button>
        </TocLink>
    )
}
