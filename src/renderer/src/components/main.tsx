import { Header } from "../components/header"
import {  ResizablePanel } from "../components/ui/resizable"

export const Main = () => {
    return (
        <ResizablePanel
            defaultSize={75}
            minSize={20}
        >
            <Header />
            <main
                className="flex-1 flex items-center justify-center text-rotion-400"
            >
                Selecione ou crie um ducumento
            </main>
        </ResizablePanel>
    )
}
