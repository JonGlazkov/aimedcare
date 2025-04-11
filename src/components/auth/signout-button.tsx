'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

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