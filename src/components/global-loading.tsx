'use client'

import { useIsFetching } from '@tanstack/react-query'
import Image from 'next/image'

import { queryClient } from '@/lib/react-query'

interface GlobalLoadingProps {
  queryKey: string[]
}

export default function GlobalLoading({ queryKey }: GlobalLoadingProps) {
  console.log(queryKey)
  const isFetching = useIsFetching(
    { queryKey, fetchStatus: 'fetching' },
    queryClient,
  )
  console.log(isFetching)

  if (isFetching <= 0) return null

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-background/70">
      <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-border bg-background">
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
