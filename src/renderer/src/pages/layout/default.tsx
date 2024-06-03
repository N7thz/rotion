import { Outlet } from "react-router-dom"
import { SideBar } from "../../components/side-bar"
import { Header } from "../../components/header"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup
} from "../../components/ui/resizable"
import { CollapseProvider } from "../../context/collapse-context"


export function Default() {
    return (

        <CollapseProvider>
            <ResizablePanelGroup
                direction="horizontal"
                className="min-h-screen w-screen bg-rotion-900 text-rotion-50"
            >
                <SideBar />
                <ResizableHandle className="bg-rotion-500 active:bg-zinc-400" />
                <ResizablePanel
                    defaultSize={75}
                    minSize={20}
                    className="flex flex-col"
                >
                    <Header />
                    <Outlet />
                </ResizablePanel>
            </ResizablePanelGroup>
        </CollapseProvider>

    )
}
