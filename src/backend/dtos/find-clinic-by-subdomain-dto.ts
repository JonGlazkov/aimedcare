import { z } from 'zod'

export const FindClinicBySubdomainDTO = z.object({
  subdomain: z.string().min(1, 'Subdomain is required'),
})

export type FindClinicBySubdomainDTOType = z.infer<
  typeof FindClinicBySubdomainDTO
>
