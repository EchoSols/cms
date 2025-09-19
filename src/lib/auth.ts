export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

function decodeJwtPayload(token: string): any | null {
  try {
    const payload = token.split('.')[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

export function getUserRole(): string | null {
  const token = getToken()
  if (!token) return localStorage.getItem('user_role')
  const payload = decodeJwtPayload(token)
  if (!payload) return localStorage.getItem('user_role')
  if (typeof payload.role === 'string') return payload.role
  if (Array.isArray(payload.roles) && payload.roles.length) return payload.roles[0]
  if (payload.user && typeof payload.user.role === 'string') return payload.user.role
  return localStorage.getItem('user_role')
}


