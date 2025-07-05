import { z } from 'zod'

export const BreedSchema = z.object({
  name: z.string(),
  origin: z.string(),
})

export const CatSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  breeds: z.array(BreedSchema),
})

export const CatApiResponseSchema = z.array(CatSchema)

export type Cat = z.infer<typeof CatSchema>
export type Breed = z.infer<typeof BreedSchema>
