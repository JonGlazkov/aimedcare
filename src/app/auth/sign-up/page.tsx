/* eslint-disable simple-import-sort/imports */
'use client'

import router from 'next/router'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

import { useKeyboardNavigation } from '@/context/use-keyboard-navigation'
import { CornerDownLeft } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useSteps } from './hooks/use-steps'
import AuthStep from './steps/auth-step'
import ClinicDetailsStep from './steps/clinic-details-step'
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
  } = useSteps()
  const { status } = useSession()

  useKeyboardNavigation({
    api,
    currentStep,
    totalSteps: count,
    isLoading: loading,
    onNext: handleNext,
    onPrevious: handlePrevious,
  })

  return (
    <div className="flex size-3/4 flex-col items-center justify-center ">
      <div className="mb-3 mr-auto">
        {/* <h2 className="text-2xl font-semibold tracking-tight">
          {getStepTitle()}
        </h2> */}
        <p className="text-muted-foreground">
          Passo {currentStep + 1} de {count}
        </p>
      </div>
      <Card className="flex size-full flex-col items-center justify-between ">
        <CardContent className="flex size-full flex-col items-center justify-center">
          <Carousel
            opts={{
              startIndex: status === 'authenticated' ? 2 : 0,
              dragFree: false,
              skipSnaps: false,
              watchDrag: false,
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
                    const buttons = document.querySelectorAll('button')
                    const firstButton = buttons[0]
                    const secondButton = buttons[1]

                    if (!e.shiftKey) {
                      if (document.activeElement === firstButton) {
                        secondButton.focus()
                        e.preventDefault()
                      }
                    }
                    if (e.shiftKey) {
                      if (document.activeElement === secondButton) {
                        firstButton.focus()
                        e.preventDefault()
                      }
                    }
                    if (document.activeElement === firstButton) {
                      firstButton.focus()
                    }
                    if (document.activeElement === secondButton) {
                      secondButton.focus()
                    }

                    e.preventDefault()
                  }

                  if (e.key === 'Enter') {
                    const buttons = document.querySelectorAll('button')
                    const firstButton = buttons[0]
                    const secondButton = buttons[1]

                    if (document.activeElement === firstButton) {
                      firstButton.click()
                      e.preventDefault()
                    }
                    if (document.activeElement === secondButton) {
                      secondButton.click()
                      e.preventDefault()
                    }
                  }
                }}
              >
                <AuthStep />
              </CarouselItem>
              <CarouselItem>
                <ClinicDetailsStep onSuccess={() => api?.scrollNext()} />
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
            <Button size="sm" onClick={() => router.push('/dashboard')}>
              Ir para o Dashboard
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
