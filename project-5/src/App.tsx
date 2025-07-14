import { useEffect, useState } from 'react'
import './App.css'
import { Text } from '@geist-ui/react'
import { useBreweries } from './hooks/useBreweries'
import { useBreweryStore } from './store/breweryStore'
import BreweryCard from './components/BreweryCard'

function App() {

  const [isOnFavorites, setIsOnFavorites] = useState(false)
  const { data, isLoading, isError } = useBreweries();
  const { favorites } = useBreweryStore();
  
  useEffect(() => {
    console.log(data)
  }, [data])


  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
  {/* Sidebar */}
  <div
    style={{
      width: '250px',
      padding: '20px',
      borderRight: '1px solid #ddd',
      backgroundColor: '#f9f9f9',
    }}
  >
    <Text h3>Menu</Text>
    <button
      onClick={() => setIsOnFavorites(false)}
      style={{
        width: '100%',
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Browse All Breweries
    </button>
    <button
      onClick={() => setIsOnFavorites(true)}
      style={{
        width: '100%',
        padding: '10px',
        backgroundColor: '#555',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      My List
    </button>
  </div>

  {/* Main content */}
  <div style={{ flex: 1, padding: '30px' }}>
    <Text h1>
      Welcome to Breweries – explore and save your favorites!
    </Text>
    <Text h3>
      {isOnFavorites ? 'My Favorite Breweries' : 'List of All Breweries'}
    </Text>

    {!isOnFavorites ? (
      <>
        {isLoading && <Text>Loading Breweries</Text>}
        {isError && <Text>Error Happened</Text>}
        {data?.map((brew: any) => (
          <BreweryCard key={brew.id} brewery={brew} />
        ))}
      </>
    ) : favorites.length === 0 ? (
      <Text>List is Empty</Text>
    ) : (
      favorites.map((fav) => (
        <BreweryCard key={fav.id} brewery={fav} />
      ))
    )}
  </div>
</div>

  
  )
}

export default App
