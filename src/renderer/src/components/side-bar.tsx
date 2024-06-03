import { Plus, Search } from "lucide-react"
import { ResizablePanel } from "../components/ui/resizable"
import { Button } from "./ui/button"
import { ChevronsLeft } from "lucide-react"
import { useCollapse } from "../context/collapse-context"
import { useRef } from "react"
import { ImperativePanelHandle } from "react-resizable-panels"

export const SideBar = () => {

    const options = ["Unititled", "Discover", "Ignite", "Rocketseat"]

    const { setIsCollapsible } = useCollapse()

    const panelRef = useRef<ImperativePanelHandle>()

    const handleExpand = () => {

        if (panelRef.current) {

            panelRef.current.collapse()
        }
    }

    return (

        <ResizablePanel
            ref={panelRef}
            collapsible
            collapsedSize={0}
            defaultSize={25}
            onCollapse={() => setIsCollapsible(true)}
            onExpand={() => setIsCollapsible(false)}
            className="flex flex-col justify-between"
        >
            <div className="space-y-4">
                <div
                    className="w-full flex items-center justify-end"
                >
                    <Button onClick={handleExpand} size={"icon"}>
                        <ChevronsLeft />
                    </Button>
                </div>

                <Button
                    className="w-full region-drag flex items-center justify-start gap-3 p-3 bg-transparent"
                >
                    <Search size={28} className="bg-rotion-700 p-2 rounded-sm" />
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
                    <ul className="space-y-2">
                        {
                            options.map(option =>
                                <li
                                    key={option}
                                    className="w-full flex justify-between text-zinc-50/80 cursor-pointer"
                                >
                                    <span>
                                        {option}
                                    </span>
                                    ...
                                </li>
                            )
                        }
                    </ul>
                </div>

            </div>
            <Button
                className="w-full rounded-none bg-transparent justify-start gap-3 hover:bg-transparent border-t border-rotion-400"
            >
                <Plus />
                <span>
                    Create new page
                </span>
            </Button>
        </ResizablePanel >
    )
}
