import Dexie from 'dexie'
import type { Entry } from '../types/Entry'

class GlycoRenalDB extends Dexie {
  entries: Dexie.Table<Entry, string>

  constructor() {
    super('GlycoRenalDB')
    this.version(1).stores({
      entries: 'entry_id, timestamp'
    })
    this.entries = this.table('entries')
  }
}

export const db = new GlycoRenalDB()
