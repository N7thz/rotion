import { Menu, Tray, app } from "electron"
import { resolve } from "node:path"

app.whenReady()
    .then(() => {

        const tray = new Tray(resolve("resources", "iconTemplate.png" ))

        const menu = Menu.buildFromTemplate([
            { label: "Rotion", enabled: false },
            { type: "separator", },
            { type: "checkbox", label: "Ativvar modo dark"  },
            { label: "Rotion", },
            { label: "Rotions", },
            { label: "Rotion", },
        ])

        tray.setContextMenu(menu)
    })
    .catch(err => console.log(err))