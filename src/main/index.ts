import { app, shell, BrowserWindow, ipcMain } from "electron"
import { join, resolve } from "node:path"
import { electronApp, optimizer, is } from "@electron-toolkit/utils"
import { createFileRoute, createURLRoute } from 'electron-router-dom'
import icon from "../renderer/src/resources/icon.png"
import "./ipc"
import "./store"

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1120,
    height: 800,
    show: true,
    autoHideMenuBar: true,
    backgroundColor: "#17141f",
    icon: resolve(__dirname, "icon.ico"),
    titleBarStyle: "hiddenInset",
    trafficLightPosition: {
      x: 20,
      y: 20
    },
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  })

  mainWindow.on("ready-to-show", () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: "deny" }
  })

  const devServerURL = createURLRoute("http://localhost:5173", "main")

  const fileRoute = createFileRoute(
    join(__dirname, '../renderer/index.html'),
    "main"
  )

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(devServerURL)
  } else {
    mainWindow.loadFile(...fileRoute)
  }
}

if (process.platform === "darwin") {
  app.dock.setIcon(resolve(__dirname, "icon.png"))
}

app.whenReady().then(() => {

  electronApp.setAppUserModelId("com.electron")

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on("ping", () => console.log("pong"))

  createWindow()

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})