import Cookies from 'js-cookie'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { TOKEN } from '../../shared'

interface LocationParams {
  token: string
}

export const AuthLayout = () => {
  const location = useLocation()
  const token = Cookies.get(TOKEN.AUTH_TOKEN)
  const state = location.state as LocationParams

  return state?.token || token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}
