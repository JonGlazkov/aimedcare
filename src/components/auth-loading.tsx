'use client'

import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import Image from 'next/image'

type GlobalLoadingProps = {
  queryKey?: string[]
  mutationKey?: string[]
}

export default function AuthLoading({
  queryKey,
  mutationKey,
}: GlobalLoadingProps) {
  const isFetching = queryKey
    ? useIsFetching({ queryKey, fetchStatus: 'fetching' }) > 0
    : false

  const mutationStates = mutationKey?.map((key) =>
    useIsMutating({ mutationKey: [key] }),
  )
  const isMutating = mutationStates?.some((state) => state > 0)

  if (!isFetching && !isMutating) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-background/70">
      <div className="flex size-24 animate-spin items-center justify-center rounded-full border-4 border-border bg-background">
        <Image
          src="/aimedcare-logo2.png"
          alt="AI Medcare"
          width={1000}
          height={1000}
          className="min-h-full w-full bg-transparent object-contain"
        />
      </div>
    </div>
  )
}
