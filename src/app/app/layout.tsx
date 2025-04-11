import { PropsWithChildren } from 'react'

import { Header } from '@/components/header'

export default function AppLayout({ children }: PropsWithChildren) {
  

  // useEffect(() => {
  //   const interceptorId = api.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       if (isAxiosError(error)) {
  //         const status = error.response?.status
  //         const code = error.response?.data.code

  //         if (status === 401 && code === 'UNAUTHORIZED') {
  //           router.replace('/sign-in')
  //         }
  //       }
  //     },
  //   )

  //   return () => {
  //     api.interceptors.response.eject(interceptorId)
  //   }
  // }, [router])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        {children}
      </div>
    </div>
  )
}
