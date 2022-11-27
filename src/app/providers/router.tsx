import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from '../../components/AuthLayout'
import { Layout } from '../../components/Layout'

const SignIn = lazy(() => import('../../pages/SignIn'))
const Main = lazy(() => import('../../pages/Main'))

export enum ROUTER_PATHS {
  SETTINGS = 'settings',
  LOGIN = 'login',
  COURSES = 'courses',
  MAIN = 'main',
  ROOT = '/',
}

export const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.ROOT,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTER_PATHS.LOGIN} />,
      },
      {
        path: ROUTER_PATHS.LOGIN,
        element: <SignIn />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTER_PATHS.MAIN,
            element: <Main />,
          },
        ],
      },
    ],
  },
])
