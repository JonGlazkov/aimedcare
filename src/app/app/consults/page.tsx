import { Metadata } from 'next'

import ConsultsPage from './consults-page'

export const metadata: Metadata = {
  title: 'Consultas',
}

export default function Consults() {
  return <ConsultsPage />
}
