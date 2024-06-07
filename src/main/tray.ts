import { BrowserWindow, Menu, Tray } from "electron"
import { resolve } from "node:path"

export function createTray(window: BrowserWindow) {

    const tray = new Tray(resolve("resources", "iconTemplate.png"))

        const menu = Menu.buildFromTemplate([
            { label: "Rotion", enabled: false },
            { type: "separator", },
            {
                label: "Criar novo documento",
                click: () => {
                    window.webContents.send("new-document")
                }
            },
            { type: "separator", },
            {
                label: "Documentos recentes",
                enabled: false,
            },
            {
                label: "Dicover",
                accelerator: "CommandOrControl+1",
                acceleratorWorksWhenHidden: false
            },
            {
                label: "Untitled",
                accelerator: "CommandOrControl+2",
                acceleratorWorksWhenHidden: false
            },
            {
                label: "Sair",
                role: "quit",
                accelerator: "Alt+F4",
            }
        ])

        tray.setContextMenu(menu)
}