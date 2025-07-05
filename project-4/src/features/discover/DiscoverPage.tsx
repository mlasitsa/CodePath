import { Text } from '@geist-ui/react'
import { useDiscover } from './useDiscover'
import { useDiscoverStore } from './useDiscoverStore'
import { CatCard } from '../../components/CatCard'
import { SmallButton } from '../../components/SmallButton'
import { HistoryList } from '../../components/HistoryList'

export const DiscoverPage = () => {
    const { data: cat, isLoading, isError, refetch } = useDiscover()
    const { banList, removeBan } = useDiscoverStore()
  
    return (
      <div style={{ padding: '2rem' }}>
        <Text h2 style={{ textAlign: 'center' }}>StumbleCat 🐾</Text>
  
        <div style={{ display: 'flex', gap: '10rem', justifyContent: 'center', alignItems: 'flex-start' }}>
          {/* Left: Current cat + ban list + discover button */}
          <div style={{ maxWidth: 450, flex: 1 }}>
            
  
            {isLoading && <Text>Loading...</Text>}
            {isError && <Text type="error">Failed to load cat 😿</Text>}
            {cat && <CatCard cat={cat} />}
            
            <br></br>
            <SmallButton onClick={() => refetch()}>
              Discover
            </SmallButton>
  
            <br></br>
  
            {banList.length > 0 && (
              <div>
                <Text h4>Ban List</Text>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {banList.map((entry, i) => (
                    <SmallButton
                      key={i}
                      onClick={() => removeBan(entry.key, entry.value)}
                      style={{
                        fontSize: '0.8rem',
                        padding: '4px 8px',
                        width: 'fit-content',
                      }}
                    >
                      {`${entry.key}: ${entry.value} ✕`}
                    </SmallButton>
                  ))}
                </div>
              </div>
            )}
          </div>
  
          {/* Right: History */}
          <div style={{ flex: 1, maxHeight: '80vh', overflowY: 'auto' }}>
            <Text h4>History</Text>
            <HistoryList />
          </div>
        </div>
      </div>
    )
  }
