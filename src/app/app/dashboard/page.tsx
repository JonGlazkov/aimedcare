import { Helmet } from 'react-helmet-async'

import { ConsultsChart } from './consults-chart'
import DayConsultsAmountCard from './day-consults-amount'
import MonthConsultsAmountCard from './month-consults-amount'
import MonthConsultsCanceledAmountCard from './month-consults-canceled-amount'
import MonthRevenueCard from './month-revenue-card'
import { PopularMedicsChart } from './popular-medics-charts'
import { PopularSpecialtiesChart } from './popular-specialties'
import { RevenueChart } from './revenue-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthConsultsAmountCard />
          <DayConsultsAmountCard />
          <MonthConsultsCanceledAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularMedicsChart />
          <PopularSpecialtiesChart />
          <ConsultsChart />
        </div>
      </div>
    </>
  )
}
