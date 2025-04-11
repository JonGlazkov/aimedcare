'use client'
import { useQuery } from '@tanstack/react-query'
import { ClipboardPlus } from 'lucide-react'

import { getMonthConsultsAmount } from '@/app/api/get-month-consult-amount/route'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MonthConsultsAmountCard() {
  const { data: monthConsultsAmount } = useQuery({
    queryFn: getMonthConsultsAmount,
    queryKey: ['metrics', 'month-consults-amount'],
  })

  return (
    <Card className="bg-background">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Consultas (mês)
        </CardTitle>
        <ClipboardPlus className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthConsultsAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthConsultsAmount.amount?.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthConsultsAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {' '}
                    +{monthConsultsAmount.diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {' '}
                    -{monthConsultsAmount.diffFromLastMonth}%
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
