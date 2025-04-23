import { dehydrate } from '@tanstack/react-query'
import { useCallback } from 'react'

import { queryClient } from '@/lib/react-query'
import { IClinic } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchClinicBySubdomain(subdomain: string) {
  // const response = await fetch(`/api/clinics/${subdomain}`)
  // if (!response.ok) {
  //   throw new Error(`Failed to fetch clinic data for subdomain: ${subdomain}`)
  // }
  // return response.json()
}

export const useFetchClinic = (subdomain: string) => {
  useCallback(async () => {
    return await queryClient.fetchQuery({
      queryKey: ['clinic', subdomain],
      queryFn: async () => await fetchClinicBySubdomain(subdomain),
      staleTime: Infinity,
    })
  }, [subdomain])

  const clinic = queryClient.getQueryData<IClinic>(['clinic', subdomain])

  return {
    dehydratedState: dehydrate(queryClient),
    clinic,
  }
}
