import { contextBridge, ipcRenderer } from "electron"
import { ElectronAPI, electronAPI } from "@electron-toolkit/preload"
import { IPC } from "~/shared/constants/ipc"
import { CreateDocumentRequest, CreateDocumentResponse, FetchAllDocumentsResponse, FetchDocumentRequest, FetchDocumentResponse } from "~/shared/types"
import { UseMutationOptions } from "@tanstack/react-query"

declare global {
  interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

const api = {

  fetchAllDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FECTH_ALL)
  },

  fetchDocuments({ id }: FetchDocumentRequest): Promise<FetchDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FECTH, id)
  },

  createDocument(): Promise<CreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE, document)
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI)
    contextBridge.exposeInMainWorld("api", api)
  } catch (error) {
    console.error(error)
  }
} else {

  window.electron = electronAPI

  window.api = api
}
