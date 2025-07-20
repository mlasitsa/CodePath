// src/providers/QueryProvider.tsx
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import type { ReactNode } from 'react'

const queryClient = new QueryClient()

type Props = {
  children: ReactNode
}   // ASk question on this

export default function QueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
