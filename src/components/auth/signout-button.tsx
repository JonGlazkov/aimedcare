'use client'

import { signOut } from 'next-auth/react'

import { Button, ButtonProps } from '@/components/ui/button'

export const SignOutButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      onClick={async () => {
        await signOut()
      }}
    >
      {props.children}
    </Button>
  )
}
