import { create } from 'zustand'
import type { BreweryStore } from '../types/types';

export const useBreweryStore = create<BreweryStore>((set, get) => ({
    allBreweries: [],
    favorites: [],
    setAll: (breweries) => set({ allBreweries: breweries }),
    toggleFavorite: (brewery) => {
      const exists = get().favorites.some((b) => b.id === brewery.id);
      set({
        favorites: exists
          ? get().favorites.filter((b) => b.id !== brewery.id)
          : [...get().favorites, brewery],
      });
    },
  }));