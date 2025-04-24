'use client'
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query'
// eslint-disable-next-line prettier/prettier
import { createContext, PropsWithChildren, useContext } from 'react'

import { Clinic } from '../../prisma/generated'

type ClinicContextType = {
  clinic: Clinic | null
}

const SubdomainContext = createContext<ClinicContextType | undefined>(undefined)

export const SubdomainProvider = ({
  children,
  clinic,
  dehydratedState,
}: PropsWithChildren<{
  clinic: Clinic | null
  dehydratedState: DehydratedState
}>) => {
  return (
    <SubdomainContext.Provider value={{ clinic }}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </SubdomainContext.Provider>
  )
}

export const useSubdomain = () => {
  const context = useContext(SubdomainContext)
  if (!context) {
    throw new Error('useSubdomain must be used within a SubdomainProvider')
  }
  return context
}
