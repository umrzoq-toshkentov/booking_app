import { withHocs } from './providers'
import { RouterProvider } from 'react-router-dom'
import { router } from './providers/router'
import { Suspense } from 'react'
import { ModalsProvider } from '@mantine/modals'

function App() {
  return (
    <ModalsProvider>
      <Suspense fallback={<div>loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </ModalsProvider>
  )
}

export default withHocs(App)
