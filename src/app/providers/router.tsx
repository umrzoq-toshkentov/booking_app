import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from '../../components/AuthLayout'
import { Layout } from '../../components/Layout'
import { getExams } from '../../shared/api'

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
            loader: (params) => {
              const page = params.request.url?.split('?')[1]?.split('=')[1] || 0
              return getExams({
                page: Number(page) > 0 ? Number(page) - 1 : 0,
                size: 10,
              })
            },
          },
        ],
      },
    ],
  },
])
