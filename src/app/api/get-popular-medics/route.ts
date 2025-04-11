import { api } from '@/lib/axios'

export type GetPopularMedicsResponse = {
  product: string // change to doctorName after the API is updated
  amount: number
}[]

export async function getPopularMedics() {
  const response = await api.get<GetPopularMedicsResponse>(
    '/metrics/popular-products',
  )

  return response.data
}
