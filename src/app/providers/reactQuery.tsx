import { FC } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

const reactQuery = (Component: FC) => () =>
  (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  )

export default reactQuery
