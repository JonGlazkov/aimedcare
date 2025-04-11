import { useQuery } from '@tanstack/react-query'
import { Activity } from 'lucide-react'

import { getDayConsultsAmount } from '@/app/api/get-day-consults-amount/route'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DayConsultsAmountCard() {
  const { data: dayConsultsAmount } = useQuery({
    queryFn: getDayConsultsAmount,
    queryKey: ['metrics', 'day-consults-amount'],
  })

  return (
    <Card className="bg-background">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Consultas (dia)
        </CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {dayConsultsAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayConsultsAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              {dayConsultsAmount.diffFromYesterday >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {' '}
                    +{dayConsultsAmount.diffFromYesterday}%
                  </span>{' '}
                  em relação a ontem
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {' '}
                    -{dayConsultsAmount.diffFromYesterday}%
                  </span>{' '}
                  em relação a ontem
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
