import { api } from '@/lib/axios'

export interface GetConsultsResponse {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

// Change status for the correct type

export interface GetConsultQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export async function getConsults({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetConsultQuery) {
  const response = await api.get<GetConsultsResponse>('/orders', {
    params: {
      pageIndex,
      customerName,
      orderId,
      status,
    },
  })

  return response.data
}
