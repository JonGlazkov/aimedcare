import { api } from '@/lib/axios'

export interface GetManagedClinicResponse {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedClinic() {
  const { data } = await api.get<GetManagedClinicResponse>(
    '/managed-restaurant', // change when the API is updated
  )

  return data
}
