import { api } from '@/lib/axios'

export interface GetDayConsultsAmountResponse {
  amount: number
  diffFromYesterday: number
}

export async function getDayConsultsAmount() {
  const response = await api.get<GetDayConsultsAmountResponse>(
    '/metrics/day-orders-amount',
  )

  return response.data
}
