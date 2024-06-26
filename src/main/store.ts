import Store from "electron-store"
import { Document } from "~/shared/types"

interface StoreType {
    documents: Record<string, Document>
}

export const store = new Store<StoreType>({
    defaults: {
        documents: {}
    }
})