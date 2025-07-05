import { Image, Text, Card, Spacer } from '@geist-ui/react'
import { useDiscoverStore } from '../features/discover/useDiscoverStore'

export const HistoryList = () => {
  const history = useDiscoverStore(state => state.history)

  if (history.length === 0) {
    return <Text>Start discovering cats to see history here!</Text>
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', width: '100%' }}>
      {history.map((cat, i) => {
        const breed = cat.breeds[0]?.name
        const origin = cat.breeds[0]?.origin

        return (
          <Card key={cat.id + i} shadow>
            <Image src={cat.url} alt="Cat" width="100%" height="160px" />
            <Text small><b>Breed:</b> {breed}</Text>
            <Text small><b>Origin:</b> {origin}</Text>
          </Card>
        )
      })}
    </div>
  )
}
