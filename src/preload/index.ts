import { contextBridge, ipcRenderer } from "electron"
import { IPC } from "~/shared/constants/ipc"
import { CreateDocumentResponse, DeleteDocumentRequest, FetchAllDocumentsResponse, FetchDocumentRequest, FetchDocumentResponse, SaveDocumentRequest } from "~/shared/types"

declare global {
  interface Window {
    api: typeof api
  }
}

const api = {

  fetchAllDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FECTH_ALL)
  },

  fetchDocument(req: FetchDocumentRequest): Promise<FetchDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FECTH, req)
  },

  createDocument(): Promise<CreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE)
  },

  saveDocument(req: SaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req)
  },

  deleteDocument(req: DeleteDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req)
  },

  onNewDocumentRequest(callback: () => void) {
    ipcRenderer.on("new-document", callback)

    return () => {
      ipcRenderer.off("new-document", callback)
    }
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("api", api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.api = api
}
