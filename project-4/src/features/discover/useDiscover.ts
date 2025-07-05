import { useQuery } from '@tanstack/react-query'
import { CatApiResponseSchema } from '../../lib/zodSchemas'
import { useDiscoverStore } from './useDiscoverStore'
import type { Cat } from '../../lib/zodSchemas'

const API_KEY = import.meta.env.VITE_CAT_API_KEY

const fetchRandomCat = async (
  isBanned: (key: 'breed' | 'origin', value: string) => boolean
): Promise<Cat> => {
  let attempts = 0
  const maxRetries = 10

  while (attempts < maxRetries) {
    const res = await fetch('https://api.thecatapi.com/v1/images/search?has_breeds=1', {
      headers: {
        'x-api-key': API_KEY || '',
      },
    })

    const data = await res.json()
    const parsed = CatApiResponseSchema.safeParse(data)

    if (!parsed.success || parsed.data.length === 0) {
      throw new Error('Invalid cat data')
    }

    const cat = parsed.data[0]
    const breed = cat.breeds[0]?.name
    const origin = cat.breeds[0]?.origin

    if (!breed || !origin || isBanned('breed', breed) || isBanned('origin', origin)) {
      attempts++
      continue // try again
    }

    return cat
  }

  throw new Error('No valid cat found after several attempts.')
}

export const useDiscover = () => {
  const isBanned = useDiscoverStore(state => state.isBanned)
  const addToHistory = useDiscoverStore(state => state.addToHistory)

  return useQuery({
    queryKey: ['random-cat'],
    queryFn: async () => {
      const cat = await fetchRandomCat(isBanned)
      addToHistory(cat)
      return cat
    },
    refetchOnWindowFocus: false,
  })
}
