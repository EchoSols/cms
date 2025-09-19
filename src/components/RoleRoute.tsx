import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getToken, getUserRole } from '@/lib/auth'

type RoleRouteProps = {
  allow: string[]
  redirectTo?: string
}

const RoleRoute = ({ allow, redirectTo = '/login' }: RoleRouteProps) => {
  const location = useLocation()
  const token = getToken()
  if (!token) return <Navigate to={redirectTo} replace state={{ from: location }} />
  const role = (getUserRole() || '').toLowerCase()
  const allowed = allow.map(r => r.toLowerCase())
  if (!role || !allowed.includes(role)) {
    return <Navigate to={redirectTo} replace />
  }
  return <Outlet />
}

export default RoleRoute


