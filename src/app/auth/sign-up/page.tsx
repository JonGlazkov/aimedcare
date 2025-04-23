/* eslint-disable simple-import-sort/imports */
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

import { Progress } from '@/components/ui/progress'
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation'
import { CornerDownLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { useSteps } from './hooks/use-steps'
import AuthStep from './steps/auth-step'
import ClinicDetailsStep from './steps/clinic-details-step'
import SuccessStep from './steps/success-step'
import WelcomeStep from './steps/welcome-step'

export default function SignUpLayout() {
  const {
    currentStep,
    count,
    setApi,
    handleNext,
    loading,
    handlePrevious,
    isLastStep,
    api,
    setCurrentStep,
  } = useSteps()
  const router = useRouter()
  const { reset } = useFormContext()

  useKeyboardNavigation({
    api,
    currentStep,
    totalSteps: count,
    isLoading: loading,
    onNext: handleNext,
    onPrevious: handlePrevious,
  })

  const getProgressBarValue = () => {
    if (isLastStep) {
      return 100
    }

    const value = ((currentStep + 1) / count) * 100
    return value
  }

  const handleFinish = () => {
    router.push('/app/dashboard')
    reset()
  }

  return (
    <div className="flex size-3/4 flex-col items-center justify-center ">
      <div className="mr-auto">
        {/* <h2 className="text-2xl font-semibold tracking-tight">
          {getStepTitle()}
          </h2> */}
        <p className="text-muted-foreground">
          Passo {currentStep + 1} de {count}
        </p>
      </div>
      <Progress className="my-2 w-full" value={getProgressBarValue()} />
      <Card className="flex size-full flex-col items-center justify-between ">
        <CardContent className="flex size-full flex-col items-center justify-center">
          <Carousel
            opts={{
              dragFree: false,
              skipSnaps: false,
              watchDrag: false,
              inViewThreshold: 0.5,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem>
                <WelcomeStep />
              </CarouselItem>
              <CarouselItem
                onKeyDown={(e) => {
                  if (e.key === 'Tab') {
                    const googleButton = document.getElementById('google-login')
                    const appleButton = document.getElementById('apple-login')

                    if (document.activeElement === googleButton) {
                      googleButton?.focus()
                      e.preventDefault()
                    }
                    if (document.activeElement === appleButton) {
                      appleButton?.focus()
                      e.preventDefault()
                    }
                  }

                  if (e.key === 'Enter') {
                    const googleButton = document.getElementById('google-login')
                    const appleButton = document.getElementById('apple-login')

                    if (document.activeElement === googleButton) {
                      googleButton?.click()
                      e.preventDefault()
                    }
                    if (document.activeElement === appleButton) {
                      appleButton?.click()
                      e.preventDefault()
                    }
                  }
                }}
              >
                <AuthStep />
              </CarouselItem>
              <CarouselItem
              // onKeyDown={(e) => {
              //   if (e.key === 'Enter') {
              //     const submitButton =
              //       document.getElementById('submit-button')

              //     if (document.activeElement === submitButton) {
              //       submitButton?.click()
              //       e.preventDefault()
              //     }
              //   }
              // }}
              >
                <ClinicDetailsStep
                  onSuccess={() => {
                    api?.scrollNext(true)
                    setCurrentStep(3)
                  }}
                />
              </CarouselItem>
              <CarouselItem onKeyDown={(e) => e.preventDefault()}>
                <SuccessStep />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </CardContent>
        <CardFooter className="flex w-full flex-row items-center justify-between border-t bg-card p-4">
          {currentStep > 0 &&
            currentStep !== 1 &&
            currentStep !== count - 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={loading}
                >
                  Voltar
                </Button>
              </div>
            )}

          <div className="flex items-center justify-between gap-2">
            {/* Mostrar dicas de teclado */}
            <div className=" hidden text-xs text-muted-foreground md:block">
              <div className="flex flex-col items-start gap-2">
                <span>
                  Pressione{' '}
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-xs">
                    Esc
                  </kbd>{' '}
                  para voltar
                </span>
                <span className="mr-2">
                  Pressione{' '}
                  <kbd className="rounded border border-gray-200 bg-gray-100 px-1 py-0.5 text-xs">
                    Enter
                  </kbd>{' '}
                  para avançar
                </span>
              </div>
            </div>
          </div>

          {currentStep === 0 && (
            <Button size="sm" onClick={handleNext} disabled={loading}>
              {loading ? 'Processando...' : 'Próximo'}
              <CornerDownLeft />
            </Button>
          )}

          {isLastStep && (
            <Button size="sm" onClick={handleFinish}>
              Ir para o Dashboard
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
