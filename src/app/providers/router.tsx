import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const SignIn = lazy(() => import('../../pages/SignIn'))
const Main = lazy(() => import('../../pages/Main'))

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/',
    element: <Main />,
  },
])
