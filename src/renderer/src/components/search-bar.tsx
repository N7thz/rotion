import { useEffect } from "react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useQuery } from "@tanstack/react-query"
import { useCollapse } from "../context/collapse-context"
import { FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function SearchBar() {

    const navigate = useNavigate()

    const { isOpenSerch, setIsOpenSerch } = useCollapse()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpenSerch(isOpenSerch => !isOpenSerch)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const { data: recents } = useQuery({
        queryKey: ["documents-recents"],
        queryFn: async () => {

            const response = await window.api.fetchAllDocuments()

            const [um, dois, tres] = response.data

            const recents = [um, dois, tres]

            return recents
        }
    })

    if (!recents) return

    function handleOpenDocument(id: string) {
        navigate(`/documents/${id}`)
        setIsOpenSerch(false)
    }

    return (
        <CommandDialog
            open={isOpenSerch}
            onOpenChange={setIsOpenSerch}
        >
            <CommandInput
                placeholder="Pesquisar documento..."
                className="placeholder:text-rotion-200"
            />
            <CommandList>
                <CommandEmpty>Sem resultados encontrados.</CommandEmpty>
                <CommandGroup heading="Recentes">
                    {
                        recents.map(recent =>
                            <CommandItem
                                key={recent.id}
                                onSelect={() =>
                                    handleOpenDocument(recent.id)
                                }
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                <span>{recent.title}</span>
                            </CommandItem>
                        )
                    }
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
