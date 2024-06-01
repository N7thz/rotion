import {  ResizablePanel } from "../components/ui/resizable"

export const SideBar = () => {

    return (
        <ResizablePanel
            defaultSize={25}
            minSize={10}
        >
            <div className="w-full region-drag">side-bar</div>
        </ResizablePanel>
    )
}
