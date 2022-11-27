import { Navigate, Outlet, useLocation } from 'react-router-dom'

const user = {
  token: null,
}

export const AuthLayout = () => {
  const location = useLocation()
  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}
