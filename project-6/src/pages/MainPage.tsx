import React from 'react'
import { useState, useEffect} from 'react'
import { useBreweries } from '../hooks/useBreweries'
import { useBreweryStore } from '../store/breweryStore'
import { Text } from '@geist-ui/react'
import BreweryCard from '../components/BreweryCard'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const MainPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const { data, isLoading, isError } = useBreweries()

    const navigate = useNavigate()

    const handleNagitage = (main: boolean) => {
        if (main) {
            navigate('/')
        } else
        navigate('/favorities')
    }


  
    useEffect(() => {
      console.log(data)
    }, [data])
  
    const filteredBreweries = data
      ?.filter((brewery: any) =>
        brewery.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((brewery: any) =>
        selectedType ? brewery.brewery_type === selectedType : true
      )
  
    // Summary statistics
    const total = filteredBreweries?.length || 0
    const avgNameLength = Math.round(
      filteredBreweries?.reduce((sum: any, b: any) => sum + b.name.length, 0) /
        (filteredBreweries?.length || 1)
    )
    const uniqueStates = new Set(filteredBreweries?.map((b: any) => b.state)).size
  
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
            onClick={() => handleNagitage(true)}
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
            onClick={() => handleNagitage(false)}
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
        <div
          style={{
            flex: 1,
            padding: '30px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          <Text h1>
            Welcome to Breweries – explore and save your favorites!
          </Text>
          <Text h3>
            {'List of All Breweries'}
          </Text>
  
          {/* Search bar */}
          
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px 15px',
                  margin: '20px 10px 20px 0',
                  width: '300px',
                  fontSize: '16px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: '#fff',
                  color: '#333',
                }}
              />
  
              {/* Filter dropdown */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  padding: '10px 15px',
                  fontSize: '16px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: '#fff',
                  color: '#333',
                }}
              >
                <option value="">All Types</option>
                <option value="micro">Micro</option>
                <option value="regional">Regional</option>
                <option value="brewpub">Brewpub</option>
                <option value="large">Large</option>
              </select>
  
              {/* Summary stats */}
              <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <Text>Total breweries: {total}</Text>
                <Text>Average name length: {avgNameLength}</Text>
                <Text>Unique states: {uniqueStates}</Text>
              </div>
            
  
          
            <>
              {isLoading && <Text>Loading Breweries</Text>}
              {isError && <Text>Error Happened</Text>}
              {filteredBreweries?.length === 0 ? (
                <Text>No breweries found for "{searchTerm}"</Text>
              ) : (
                
                filteredBreweries?.map((brewery: any) => (
                    <Link 
                      to={`/brewery/${brewery.id}`} 
                      key={brewery.id} 
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <BreweryCard brewery={brewery} />
                    </Link>
                ))
              )}
            </>
        </div>
      </div>
    )
  }

export default MainPage