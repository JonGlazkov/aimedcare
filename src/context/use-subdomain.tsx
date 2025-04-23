import { createContext, PropsWithChildren, useContext } from 'react'

import { Clinic } from '../../prisma/generated'

type ClinicContextType = {
  clinic: Clinic | null
}

const SubdomainContext = createContext<ClinicContextType | undefined>(undefined)

export const SubdomainProvider = ({
  children,
  clinic,
}: PropsWithChildren<{ clinic: Clinic | null }>) => {
  return (
    <SubdomainContext.Provider value={{ clinic }}>
      {children}
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
