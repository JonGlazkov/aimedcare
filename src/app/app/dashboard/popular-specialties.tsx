import { RadarIcon, TrendingUp } from 'lucide-react'
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardFooter,
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
  { specialtiesName: 'Fonoaudiologia', amount: 53 },
  { specialtiesName: 'Cardiologia', amount: 42 },
  { specialtiesName: 'Clínico Geral', amount: 25 },
  { specialtiesName: 'Odontologia', amount: 17 },
  { specialtiesName: 'Fisioterapia', amount: 29 },
]

const chartConfig = {
  amount: {
    label: 'Especialidade',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.fuchsia[500],
]

export function PopularSpecialtiesChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Especialidades mais procuradas
          </CardTitle>
          <RadarIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadarChart data={data} style={{ fontSize: 12 }}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
                formatter={(value, _, props) => {
                  const color =
                    COLORS[
                      data.findIndex(
                        (item) =>
                          item.specialtiesName ===
                          props.payload.specialtiesName,
                      )
                    ]
                  return (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                        style={{ backgroundColor: color }}
                      />
                      <span key="name" className="text-foreground">
                        {props.payload.specialtiesName}
                      </span>
                      <span key="value" className="font-medium">
                        {value}
                      </span>
                    </>
                  )
                }}
              />
              <PolarAngleAxis dataKey="specialtiesName" />
              <PolarGrid accentHeight={12} />
              <Radar
                dataKey="amount"
                fillOpacity={0.7}
                fill={colors.cyan['500']}
              />
            </RadarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Mostrando as especialidades mais procuradas no ultimo mês{' '}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
