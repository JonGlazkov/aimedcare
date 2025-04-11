'use client'
import { useQuery } from '@tanstack/react-query'
import { ClipboardMinus } from 'lucide-react'

import { getMonthCanceledConsultAmount } from '@/app/api/get-month-canceled-consults-amount/route'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MonthConsultsCanceledAmountCard() {
  const { data: monthCanceledConsultsAmount } = useQuery({
    queryFn: getMonthCanceledConsultAmount,
    queryKey: ['metrics', 'month-canceled-consults-amount'],
  })

  return (
    <Card className="bg-background">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <ClipboardMinus className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthCanceledConsultsAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledConsultsAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthCanceledConsultsAmount.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {' '}
                    -{monthCanceledConsultsAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {' '}
                    +{monthCanceledConsultsAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
