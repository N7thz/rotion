import { ipcMain } from "electron"
import { IPC } from "~/shared/constants/ipc"
import {
    CreateDocumentResponse,
    DeleteDocumentRequest,
    FetchAllDocumentsResponse,
    FetchDocumentRequest,
    FetchDocumentResponse,
    SaveDocumentRequest
} from "~/shared/types"
import { store } from "./store"
import { Document } from "~/shared/types"
import { randomUUID } from "node:crypto"

ipcMain.handle(
    IPC.DOCUMENTS.FECTH_ALL,
    async (): Promise<FetchAllDocumentsResponse> => {
        return {
            data: Object.values(store.get("documents"))
        }
    }
)

ipcMain.handle(
    IPC.DOCUMENTS.FECTH,
    async (_, { id }: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
        const document: Document = store.get(`documents.${id}`)

        return {
            data: document
        }
    }
)

ipcMain.handle(
    IPC.DOCUMENTS.CREATE,
    async (): Promise<CreateDocumentResponse> => {

        const id = randomUUID()

        const document: Document = {
            id,
            title: "Untitled"
        }

        store.set(`documents.${id}`, document)

        return {
            data: document
        }
    }
)

ipcMain.handle(
    IPC.DOCUMENTS.SAVE,
    async (_, { id, title, content }: SaveDocumentRequest): Promise<void> => {

        store.set(`documents.${id}`, {
            id, title, content
        })
    }
)

ipcMain.handle(
    IPC.DOCUMENTS.DELETE,
    async (_, { id }: DeleteDocumentRequest): Promise<void> => {
        // @ts-ignore
        store.delete(`documents.${id}`)
    }
)