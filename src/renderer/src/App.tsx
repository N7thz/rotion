import { Header } from "./components/header"
import { SideBar } from "./components/side-bar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable"
import "./global.css"

export function App() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen w-screen"
    >
      <ResizablePanel
        defaultSize={25}
        minSize={10}
      >
        <SideBar />
      </ResizablePanel>

      <ResizableHandle />

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
    </ResizablePanelGroup>
  )
}
