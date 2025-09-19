import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation()
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet />
}

export default ProtectedRoute


