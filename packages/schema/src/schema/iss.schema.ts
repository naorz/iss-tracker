import { z } from 'zod'

export const ISSPositionSchema = z.object({
  iss_position: z.object({
    latitude: z.string(),
    longitude: z.string(),
  }),
  timestamp: z.number(),
  message: z.string(),
})

export type ISSPosition = z.infer<typeof ISSPositionSchema>;
