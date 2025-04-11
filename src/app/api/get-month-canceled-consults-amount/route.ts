import { api } from '@/lib/axios'

export interface GetMonthConsultsAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthCanceledConsultAmount() {
  const response = await api.get<GetMonthConsultsAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  )

  return response.data
}
