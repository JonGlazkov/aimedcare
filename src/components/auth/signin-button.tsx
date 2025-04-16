'use client'

import { signIn } from 'next-auth/react'

import { Button, ButtonProps } from '@/components/ui/button'

export const SignInButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      onClick={async () => {
        await signIn()
      }}
    >
      {props.children}
    </Button>
  )
}
