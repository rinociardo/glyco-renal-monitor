import { defineStore } from 'pinia'
import { db } from '../services/localDB'
import type { Entry } from '../types/Entry'

export const useEntriesStore = defineStore('entries', {
  state: () => ({
    entries: [] as Entry[]
  }),
  actions: {
    async loadEntries() {
      this.entries = await db.entries.toArray()
    },
    async addEntry(entry: Entry) {
      const cleanEntry = JSON.parse(JSON.stringify(entry))
      await db.entries.put(cleanEntry)
      this.entries.push(cleanEntry)
    }
  }
})
