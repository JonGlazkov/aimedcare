import { api } from '@/lib/axios'

export type GetDailyRevenueInPeriodParams = {
  date: string
  receipt: number
}[]

export interface getDailyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

export async function getDailyRevenueInPeriod({
  from,
  to,
}: getDailyRevenueInPeriodQuery) {
  const { data } = await api.get<GetDailyRevenueInPeriodParams>(
    `/metrics/daily-receipt-in-period`,
    {
      params: {
        from,
        to,
      },
    },
  )
  return data
}
