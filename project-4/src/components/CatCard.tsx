import { Card, Text, Image } from '@geist-ui/react'
import type { Cat } from '../lib/zodSchemas'
import { useDiscoverStore } from '../features/discover/useDiscoverStore'

interface CatCardProps {
  cat: Cat
}

export const CatCard = ({ cat }: CatCardProps) => {
  const { isBanned, addBan, removeBan } = useDiscoverStore()

  const breed = cat.breeds[0]?.name
  const origin = cat.breeds[0]?.origin

  const handleToggle = (key: 'breed' | 'origin', value: string) => {
    if (isBanned(key, value)) {
      removeBan(key, value)
    } else {
      addBan(key, value)
    }
  }

  const attrStyle = (key: 'breed' | 'origin', value: string) =>
    isBanned(key, value)
      ? { textDecoration: 'line-through', cursor: 'pointer', color: '#888' }
      : { fontWeight: 600, cursor: 'pointer' }

  return (
    <Card shadow width="100%" style={{ maxWidth: 400 }}>
      <Image src={cat.url} alt="Cat" height="200px" width="100%" />
      <Text>
        Breed:{' '}
        <span onClick={() => handleToggle('breed', breed)} style={attrStyle('breed', breed)}>
          {breed}
        </span>
      </Text>
      <Text>
        Origin:{' '}
        <span onClick={() => handleToggle('origin', origin)} style={attrStyle('origin', origin)}>
          {origin}
        </span>
      </Text>
    </Card>
  )
}
