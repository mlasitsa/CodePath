import { useParams } from 'react-router-dom'
import { useDynamicBrewery } from '../hooks/useBreweries'

const BreweryPage = () => {
  const { id } = useParams()
  const { data: brewery, isLoading, error } = useDynamicBrewery(id)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading brewery.</p>
  if (!brewery) return <p>No brewery found.</p>

  return (
    <div>
      <h1>{brewery.name}</h1>
      <p>Type: {brewery.brewery_type}</p>
      <p>Address: {brewery.street}, {brewery.city}, {brewery.state}</p>
      <p>Phone: {brewery.phone}</p>
      <p>Website: <a href={brewery.website_url} target="_blank" rel="noreferrer">{brewery.website_url}</a></p>
    </div>
  )
}

export default BreweryPage
