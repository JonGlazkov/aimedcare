import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { z } from 'zod'

import { getConsults } from '@/app/api/get-consults/route'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useSearchParams } from 'next/navigation'
import ConsultsTableFilter from './consults-table-filter'
import ConsultsTableRow from './consults-table-row'

export function Consults() {
  const [searchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { data: result } = useQuery({
    queryKey: ['consults', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getConsults({
        pageIndex,
        orderId,
        customerName,
        status: status === 'all' ? null : status,
      }),
  })

  function handlePagination(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', String(pageIndex + 1))

      return state
    })
  }

  return (
    <>
      <Helmet title="Consultas" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Consultas</h1>
        <div className="space-y-5">
          <ConsultsTableFilter />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  {/* <TableHead className="w-[180px]">Realizado em</TableHead> */}
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Data da consulta</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>{'Médico(a)'}</TableHead>
                  <TableHead className="w-[140px]">Valor</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result &&
                  result.orders.map((order) => (
                    <ConsultsTableRow key={order.orderId} consult={order} />
                  ))}
              </TableBody>
            </Table>
          </div>
          {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePagination}
            />
          )}
        </div>
      </div>
    </>
  )
}
