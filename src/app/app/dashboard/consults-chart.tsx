import { LineChartIcon } from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

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

const data = [
  { month: 'Janeiro', monthlyConsults: 100 },
  { month: 'Fevereiro', monthlyConsults: 200 },
  { month: 'Março', monthlyConsults: 300 },
  { month: 'Abril', monthlyConsults: 250 },
  { month: 'Maio', monthlyConsults: 350 },
  { month: 'Junho', monthlyConsults: 700 },
  { month: 'Julho', monthlyConsults: 320 },
  { month: 'Agosto', monthlyConsults: 250 },
  { month: 'Setembro', monthlyConsults: 400 },
  { month: 'Outubro', monthlyConsults: 580 },
  { month: 'Novembro', monthlyConsults: 730 },
  { month: 'Dezembro', monthlyConsults: 900 },
]

const chartConfig = {
  monthlyConsults: {
    label: 'Consultas',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function ConsultsChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Consultas do Periodo de{' '}
            <span className="font-semibold text-primary">
              {new Date().getFullYear()}
            </span>
          </CardTitle>
          <CardDescription>
            Consultas realizadas mensalmente no período
          </CardDescription>
        </div>
        <LineChartIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <ChartContainer config={chartConfig}>
            <LineChart accessibilityLayer data={data} style={{ fontSize: 12 }}>
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                dy={12}
              />

              <YAxis
                dataKey="monthlyConsults"
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <ChartTooltip
                cursor
                content={<ChartTooltipContent hideLabel />}
                payload={[{ name: 'Consulta', color: colors.emerald['500'] }]}
              />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="monthlyConsults"
                stroke={colors.emerald['500']}
              />
            </LineChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
