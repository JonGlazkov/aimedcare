import { api } from '@/lib/axios'

export interface GetMonthConsultsAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthConsultsAmount() {
  const response = await api.get<GetMonthConsultsAmountResponse>(
    '/metrics/month-orders-amount',
  )

  return response.data
}
