// src/api/useBreweries.ts
import { useQuery } from '@tanstack/react-query'
import { BreweriesList } from '../types/types'
import { useBreweryStore } from '../store/breweryStore'


export const useBreweries = () => {
  const { setAll } = useBreweryStore()

  return useQuery({
    queryKey: ['breweries'], // does query key need to match with the zustand? More examples when key matters, on mutations? 
    queryFn: async () => {
      const res = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=100')
      const json = await res.json()
      setAll(json) // save to Zustand
      return json
    }
  })
}

export const useDynamicBrewery = (id: any) => {
  
  return useQuery({
    queryKey: ['breweries', id],
    queryFn: async () => {
      const res = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      const json = await res.json()
      return json
    },
    enabled: !!id
  })
}

