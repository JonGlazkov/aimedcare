import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { CarouselApi } from '@/components/ui/carousel'
import { useToast } from '@/hooks/use-toast'

import { useFormSteps } from '../context/form-context'

export function useSteps() {
  const { data: session } = useSession()
  const [api, setApi] = useState<CarouselApi>()
  const [count, setCount] = useState(0)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { currentStep, setCurrentStep } = useFormSteps()

  const isLastStep = currentStep === count - 1

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)

    api.on('select', () => {
      setCurrentStep(api.selectedScrollSnap())
    })
  }, [api, setCurrentStep])

  useEffect(() => {
    if (!api) return

    if (session?.user && currentStep <= 2) {
      api.scrollTo(2)
      setCurrentStep(2)
    }
  }, [api, currentStep, setCurrentStep])

  useEffect(() => {
    if (!api) return

    api.on('pointerDown', () => {
      return false
    })
  }, [api])

  const handleNext = async () => {
    if (!api) return

    setLoading(true)
    try {
      if (currentStep === 0) return api.scrollNext(true)
    } catch (error) {
      toast({
        title: 'Erro ao avançar',
        description: 'Houve um erro ao avançar para o próximo passo.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePrevious = async () => {
    if (!api) return

    api.scrollPrev(true)
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 0:
        return 'Bem-vindo(a) a AI Medcare'
      case 1:
        return 'Escolha a sua forma de autenticação'
      case 2:
        return 'Dados da clínica'
      case 3:
        return 'Confira os dados'
      case 4:
        return 'Concluído'
      default:
        return 'Crie sua conta'
    }
  }

  return {
    api,
    count,
    currentStep,
    isLastStep,
    loading,
    setApi,
    setCurrentStep,
    handleNext,
    handlePrevious,
    getStepTitle,
  }
}
