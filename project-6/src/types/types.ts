import z from "zod";


const BrewerySchema = z.object({
    id: z.string(),
    name: z.string(),
    brewery_type: z.string(),
    address_1: z.string(),
    address_2: z.string().optional(),
    address_3: z.string().optional(),
    city: z.string(),
    state_province: z.string(),
    postal_code: z.string(),
    country: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    phone: z.string(),
    website_url: z.string(),
    state: z.string(),
    street: z.string(),
})

export const BreweriesList = z.array(BrewerySchema)

export type BreweryStore = {
    allBreweries: BreweryType[];
    favorites: BreweryType[];
    setAll: (breweries: BreweryType[]) => void;
    toggleFavorite: (brewery: BreweryType) => void;
  };

const BreweryCardSchema = z.object({
    breweryId: z.string(),
    breweryName: z.string(),
    breweryCountry: z.string(),
    breweryState: z.string(),
    breweryLocation: z.string(),
    breweryUrl: z.string(),
    breweryType: z.string(),
})


export type BreweryType = z.infer<typeof BrewerySchema>;
export type BreweryCardType = z.infer<typeof BreweryCardSchema>