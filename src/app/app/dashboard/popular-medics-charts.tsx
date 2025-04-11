import { BarChart, TrendingUp } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { medicName: 'Michele Rigon', amount: 53 },
  { medicName: 'Arnóbio Pacheco', amount: 42 },
  { medicName: 'Marcial Bretas', amount: 25 },
  { medicName: 'Gabriela Lima', amount: 17 },
  { medicName: 'Jõao das Neves', amount: 29 },
]

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

export function PopularMedicsChart() {
  // const { data: popularMedics } = useQuery({
  //   queryFn: getPopularMedics,
  //   queryKey: ['metrics', 'popular-medics'],
  // })

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Médicos mais procurados
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {data && (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="medicName"
                cx="50%"
                cy="50%"
                outerRadius={86}
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = 12 + innerRadius + (outerRadius - innerRadius)
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {data[index].medicName.length > 16
                        ? data[index].medicName
                            .substring(0, 12)
                            .concat('...')
                        : data[index].medicName}{' '}
                      ({value})
                    </text>
                  )
                }}
              >
                {data.map((_, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                      className="stroke-background hover:opacity-80"
                    />
                  )
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Mostrando os médicos mais procurados no ultimo mês{' '}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
