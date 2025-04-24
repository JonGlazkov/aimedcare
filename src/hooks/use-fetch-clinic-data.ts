import { dehydrate } from '@tanstack/react-query'

import { queryClient } from '@/lib/react-query'
import { getClinicBySubdomain } from '@/services/clinic'

import { Clinic } from '../../prisma/generated'

export const useFetchClinic = async (subdomain: string) => {
  const data = await queryClient.fetchQuery<Clinic>({
    queryKey: ['clinic-by-domain', subdomain],
    queryFn: () => getClinicBySubdomain(subdomain),
  })

  const clinic = queryClient.getQueryData<Clinic>([
    'clinic-by-domain',
    subdomain,
  ])

  return {
    dehydratedState: dehydrate(queryClient),
    clinic: clinic ?? data,
  }
}
