import { withHocs } from './providers'
import { RouterProvider } from 'react-router-dom'
import { router } from './providers/router'
import { Suspense } from 'react'

function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default withHocs(App)
