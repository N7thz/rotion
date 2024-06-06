import { ChevronsRight, CodeXml, Trash } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "./ui/breadcrumb"
import { Button } from "./ui/button"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useCollapse } from "../context/collapse-context"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Document } from "~/shared/types"

export const Header = () => {

    const queryClient = useQueryClient()

    const { id } = useParams<{ id: string }>()

    const navigate = useNavigate()

    const { mutateAsync: deleteDocument, isPending: isDeletingDocument } = useMutation({
        mutationFn: async () => {
            await window.api.deleteDocument({ id: id! })
        },
        onSuccess: () => {
            queryClient.setQueryData(["documents"], (documents: Document[]) => {
                return documents.filter(doc => doc.id !== id)
            })

            navigate("/")
        }
    })

    const { isCollapsible, panelRef } = useCollapse()

    const handleExpand = () => {
        if (panelRef.current) panelRef.current.expand()
    }

    return (
        <header
            className="h-14 region-drag border-b border-rotion-400 px-3 py-2 flex justify-between items-center"
        >
            {
                isCollapsible &&
                <Button
                    size={"icon"}
                    onClick={handleExpand}
                    className="bg-transparent"
                >
                    <ChevronsRight />
                </Button>
            }

            {
                id &&
                <>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link
                                        to="/"
                                        className="flex gap-2 items-center"
                                    >
                                        <CodeXml color="red" />
                                        Estrutura técnica
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbEllipsis />
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to="/docs/components">
                                        Back-end
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    Unititled
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <Button
                        onClick={() => deleteDocument()}
                        disabled={isDeletingDocument}
                        className="flex gap-2 bg-transparent hover:bg-rotion-700"
                    >
                        <Trash size={20} />
                        Apagar
                    </Button>
                </>
            }
        </header>
    )
}
