import { Grid, Card, Text } from "@geist-ui/react"
import type { BreweryType } from "../types/types"
import { useBreweryStore } from "../store/breweryStore"

type Props = {
    brewery: BreweryType;
  };

const BreweryCard = ({brewery} : Props) => {

    const {toggleFavorite, favorites} = useBreweryStore()
    const isFavorite = favorites.find((fav) => fav.id == brewery.id)

  return (
    <Grid.Container gap={1.5}>
  <Grid xs={12} justify="center">
    <Card width="100%">
      <Text h2 my={0}>{brewery.name}</Text>
      <Text h4>{brewery.brewery_type}</Text>
      <a href={`${brewery.website_url}`}>
      <Text>Website</Text>
      </a>
      <Text h4>{`${brewery.address_1}, ${brewery.state}, ${brewery.country}`}</Text>
      <button onClick={() => toggleFavorite(brewery)}>{isFavorite ? "Remove from Favorite" : "Add to Favorite" }</button>
    </Card>
  </Grid>
</Grid.Container>
  )
}

export default BreweryCard