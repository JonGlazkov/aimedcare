import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { LineChartIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/app/api/get-daily-revenue-in-period/route'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'

// const data = [
//   { date: '10/12', revenue: 1200 },
//   { date: '11/12', revenue: 800 },
//   { date: '12/12', revenue: 900 },
//   { date: '13/12', revenue: 400 },
//   { date: '14/12', revenue: 2300 },
//   { date: '15/12', revenue: 8400 },
//   { date: '16/12', revenue: 530 },
// ]

const chartConfig = {
  receipt: {
    label: 'Receita',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map((item) => ({
      date: item.date,
      receipt: item.receipt / 100,
    }))
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período de{' '}
            <span className="font-semibold text-primary">
              {new Date().getFullYear()}
            </span>
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          <LineChartIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {dailyRevenueInPeriod && (
          <ResponsiveContainer width="100%" height={240}>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                style={{ fontSize: 12 }}
              >
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  dy={16}
                />

                <YAxis
                  stroke="#888"
                  axisLine={false}
                  tickLine={false}
                  width={80}
                  tickFormatter={(value: number) =>
                    value.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  }
                />
                <CartesianGrid vertical={false} className="stroke-muted" />
                <ChartTooltip
                  cursor
                  content={<ChartTooltipContent hideLabel />}
                  payload={[{ name: 'Receita', color: colors.violet['500'] }]}
                  formatter={(value, name) => (
                    <>
                      <div className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-violet-500" />
                      <span key="name" className="text-muted-foreground">
                        {chartConfig[name as keyof typeof chartConfig]?.label ||
                          name}
                      </span>
                      <span key="value" className="font-medium">
                        {value.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    </>
                  )}
                />
                <Line
                  type="linear"
                  strokeWidth={2}
                  dataKey="receipt"
                  stroke={colors.violet['500']}
                />
              </LineChart>
            </ChartContainer>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
