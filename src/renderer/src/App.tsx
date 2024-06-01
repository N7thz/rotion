import { Main } from "./components/main"
import { SideBar } from "./components/side-bar"
import {
  ResizableHandle,
  ResizablePanelGroup,
} from "./components/ui/resizable"
import "./global.css"

export function App() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen w-screen bg-rotion-900 text-rotion-50"
    >
      <SideBar />
      <ResizableHandle className="bg-rotion-500 active:bg-zinc-400" />
      <Main />
    </ResizablePanelGroup>
  )
}
