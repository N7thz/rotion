

import {
    Dispatch,
    MutableRefObject,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useRef,
    useState,
} from "react"
import { ImperativePanelHandle } from "react-resizable-panels"

export interface CollapseContextProps {
    panelRef: MutableRefObject<ImperativePanelHandle | undefined>
    isCollapsible: boolean
    setIsCollapsible: Dispatch<SetStateAction<boolean>>
    isOpenSerch: boolean
    setIsOpenSerch: Dispatch<SetStateAction<boolean>>
}

const CollapseContext = createContext({} as CollapseContextProps)

export const CollapseProvider = ({ children }: { children: ReactNode }) => {

    const panelRef = useRef<ImperativePanelHandle>()
    const [isCollapsible, setIsCollapsible] = useState<boolean>(false)
    const [isOpenSerch, setIsOpenSerch] = useState(false)

    const value: CollapseContextProps = {
        panelRef,
        isCollapsible, setIsCollapsible,
        isOpenSerch, setIsOpenSerch
    }

    return (
        <CollapseContext.Provider value={value}>
            {children}
        </CollapseContext.Provider>
    )
}

export const useCollapse = () => useContext(CollapseContext)
