'use client'

import { useCallback, useEffect } from 'react'

import type { CarouselApi } from '@/components/ui/carousel'

interface UseKeyboardNavigationProps {
  api: CarouselApi | null
  currentStep: number
  totalSteps: number
  isLoading: boolean
  onNext: () => Promise<void>
  onPrevious: () => void
  isFormFocused?: boolean
}

export function useKeyboardNavigation({
  api,
  currentStep,
  totalSteps,
  isLoading,
  onNext,
  onPrevious,
}: UseKeyboardNavigationProps) {
  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          if (currentStep < totalSteps - 1) {
            event.preventDefault()
            await onNext()
          }
          break
        case 'Escape':
          if (currentStep > 0) {
            event.preventDefault()
            onPrevious()
          }
          break
      }
    },
    [api, currentStep, totalSteps, isLoading, onNext, onPrevious],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}
