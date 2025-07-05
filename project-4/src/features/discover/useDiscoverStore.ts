import { create } from 'zustand'
import type { Cat } from '../../lib/zodSchemas'

type BanEntry = {
  key: 'breed' | 'origin'
  value: string
}

interface DiscoverStore {
  banList: BanEntry[]
  history: Cat[]

  isBanned: (key: BanEntry['key'], value: string) => boolean
  addBan: (key: BanEntry['key'], value: string) => void
  removeBan: (key: BanEntry['key'], value: string) => void

  addToHistory: (cat: Cat) => void
  clearHistory: () => void
}

export const useDiscoverStore = create<DiscoverStore>((set, get) => ({
  banList: [],
  history: [],

  isBanned: (key, value) => {
    return get().banList.some(entry => entry.key === key && entry.value === value)
  },

  addBan: (key, value) => {
    if (!get().isBanned(key, value)) {
      set(state => ({
        banList: [...state.banList, { key, value }],
      }))
    }
  },

  removeBan: (key, value) => {
    set(state => ({
      banList: state.banList.filter(entry => !(entry.key === key && entry.value === value)),
    }))
  },

  addToHistory: (cat: Cat) => {
    set(state => ({
      history: [cat, ...state.history],
    }))
  },

  clearHistory: () => {
    set({ history: [] })
  },
}))
